// Scroll entrance reveal, CSS only. No "use client", no JavaScript, no bundle.
//
// The first version of this was a Framer Motion `whileInView` component. That
// shipped 39 content blocks in the server HTML with an inline
// style="opacity:0;transform:translateY(20px)" and relied on JS to reveal them:
// the whole FAQ, every service card and the proof strip were invisible until
// hydration landed. The GSAP code this replaced set opacity from JS, so the
// server HTML was at least visible. That was a regression, so it is gone.
//
// This version is pure progressive enhancement. Content is visible by default in
// the stylesheet. Browsers that support scroll-driven animations get the reveal;
// everything else, and anyone with reduced-motion set, gets the content
// immediately. See .reveal in globals.css.

type RevealProps = {
  children: React.ReactNode;
  /** Stagger position, feeds --reveal-i to offset this item's animation range. */
  index?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

export function Reveal({ children, index = 0, className = "", as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      className={`reveal ${className}`.trim()}
      // Capped so a long list does not push the last items far down their range.
      style={{ "--reveal-i": Math.min(index, 6) } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
