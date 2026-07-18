import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_PIPELINE_ID = "MkxbLUYBD3qBvYFEofw4"; // Growth OS Lead Pipeline
const GHL_STAGE_NEW_LEAD = "118e72fb-270f-474d-bf2b-780d1cd7d83c";

type FormBody = {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  project?: string;
  timeline?: string;
  size?: string;
  message?: string;
  _subject?: string;
};

async function ghlFetch(path: string, payload: Record<string, unknown>) {
  const res = await fetch(`${GHL_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`GHL ${path} ${res.status}: ${await res.text()}`);
  return res.json();
}

// CRM is the system of record: even if email notification fails, the lead
// must land in GHL so it is never silently lost.
async function pushToGHL(body: FormBody) {
  const [firstName, ...rest] = (body.name || "Website Lead").trim().split(/\s+/);
  const contact = await ghlFetch("/contacts/upsert", {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName: rest.join(" "),
    companyName: body.company || undefined,
    email: body.email,
    phone: body.phone || undefined,
    source: "ofbswfl.com website form",
    tags: ["website-lead", "inbound"],
  });
  const contactId = contact?.contact?.id;
  if (!contactId) throw new Error("GHL upsert returned no contact id");

  const details = [
    body.project && `Project: ${body.project}`,
    body.timeline && `Timeline: ${body.timeline}`,
    body.size && `Office size: ${body.size}`,
    body.message && `Message: ${body.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  if (details) {
    await ghlFetch(`/contacts/${contactId}/notes`, { body: `Website form submission.\n\n${details}` });
  }

  try {
    await ghlFetch("/opportunities/", {
      locationId: process.env.GHL_LOCATION_ID,
      pipelineId: GHL_PIPELINE_ID,
      pipelineStageId: GHL_STAGE_NEW_LEAD,
      contactId,
      name: `${body.company || body.name || "Website lead"}, website inquiry`,
      status: "open",
    });
  } catch (e) {
    // A repeat submission from the same contact already has an open opportunity.
    if (!String(e).includes("duplicate opportunity")) throw e;
  }
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body: FormBody = await req.json();
    const { name, company, phone, email, project, timeline, size, message, _subject } = body;

    const subject = _subject || "New OFB Project Inquiry";
    const isHeroForm = !!project;

    const htmlBody = isHeroForm
      ? `
        <h2>New Project Assessment Request</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Company</td><td style="padding:8px;">${company || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Phone</td><td style="padding:8px;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Email</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Project Details</td><td style="padding:8px;">${project || "Not provided"}</td></tr>
        </table>
        <p style="margin-top:16px;color:#666;font-size:12px;">Submitted via ofbswfl.com hero form</p>
      `
      : `
        <h2>New Project Inquiry</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Company</td><td style="padding:8px;">${company || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Phone</td><td style="padding:8px;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Email</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Timeline</td><td style="padding:8px;">${timeline || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Office Size</td><td style="padding:8px;">${size || "Not provided"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Message</td><td style="padding:8px;">${message || "Not provided"}</td></tr>
        </table>
        <p style="margin-top:16px;color:#666;font-size:12px;">Submitted via ofbswfl.com contact form</p>
      `;

    let crmOk = false;
    try {
      await pushToGHL(body);
      crmOk = true;
    } catch (crmErr) {
      console.error("GHL push error:", crmErr);
      // CRM push failed silently otherwise — alert so the lead isn't lost.
      await resend.emails.send({
        from: "OFB Website <noreply@ofbswfl.com>",
        to: "jmoore@ofbswfl.com",
        subject: "ALERT: website lead did not reach the CRM",
        html: `<p>A lead submitted the ofbswfl.com form but failed to save to GHL. Add manually:</p><p>${name} / ${email} / ${phone || "no phone"} / ${company || "no company"}</p><p>Error: ${String(crmErr)}</p>`,
      }).catch(() => {});
    }

    const { error } = await resend.emails.send({
      from: "OFB Website <noreply@ofbswfl.com>",
      to: "jmoore@ofbswfl.com",
      replyTo: email,
      subject,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      // Email failed but the lead is safe in the CRM, still a success for the visitor.
      if (crmOk) return NextResponse.json({ success: true });
      return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
  }
}
