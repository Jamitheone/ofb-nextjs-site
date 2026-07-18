import type { Metadata } from "next";
import DecommissioningEstimator from "@/components/estimator/DecommissioningEstimator";

export const metadata: Metadata = {
  title: "Decommissioning Value Estimator | Office Furniture Brokers of SW Florida",
  description:
    "Estimate the asset recovery value of your office decommissioning project. Enter square footage, asset mix, timeline, and condition to get an illustrative recovery range and a project urgency read.",
};

export default function EstimatorPage() {
  return (
    <main className="min-h-screen bg-[#0e1530] text-white antialiased">
      <div className="noise-overlay" />
      <DecommissioningEstimator />
    </main>
  );
}
