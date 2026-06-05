"use client";

import { Recommendation } from "@/types/chat.types";

export default function HomeFitScore({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  const top = recommendations?.[0];

  if (!top) return null;

  return (
    <section className="rounded-[32px] border border-[#eceaf7] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">ARKHA Home Fit Score</h2>
          <p className="text-sm text-gray-500">Based on your inputs</p>
        </div>

        <button className="rounded-xl bg-[#f4f1ff] px-4 py-3 text-sm font-semibold text-[#5b43ff]">
          View full analysis
        </button>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-3xl bg-[#fbfaff] p-6">
          <div className="flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-[#7c5cff]">
            <div className="text-center">
              <p className="text-4xl font-black">{top.confidenceScore}%</p>
              <p className="mt-1 text-xs text-gray-500">Overall Fit</p>
            </div>
          </div>

          <span className="mt-4 rounded-full bg-[#eeeaff] px-4 py-2 text-xs font-semibold text-[#5b43ff]">
            Excellent Fit
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ["Financial Fit", top.financialFit],
            ["Commute Fit", top.commuteFit],
            ["Lifestyle Fit", top.lifestyleFit],
            ["Future Appreciation", top.appreciationFit],
            ["Risk Score", top.riskLevel],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <p className="text-sm text-gray-500">{label}</p>
              <p className="mt-2 text-2xl font-black">{value}</p>
              <p className="mt-2 text-xs text-green-600">Based on ARKHA score</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-[#f4f1ff] p-5 text-sm text-gray-700">
        <strong>Why this score?</strong>{" "}
        {top.reasons?.[0] || "This project best matches your saved preferences."}
      </div>
    </section>
  );
}