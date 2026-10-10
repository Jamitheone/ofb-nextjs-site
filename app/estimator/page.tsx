import type { Metadata } from "next";
import DecommissioningEstimator from "@/components/estimator/DecommissioningEstimator";

export const metadata: Metadata = {
  title: "Decommissioning Value Estimator",
  alternates: { canonical: "/estimator" },
  description:
    "Estimate asset recovery value for an office decommissioning project in Florida. Enter size, asset mix and timeline for an illustrative recovery range.",
};

export default function EstimatorPage() {
  return (
    <main className="min-h-screen bg-[#0e1530] text-white antialiased">
      <div className="noise-overlay" />
      <DecommissioningEstimator />
    </main>
  );
}
