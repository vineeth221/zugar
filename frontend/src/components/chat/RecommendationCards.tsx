"use client";

import { Heart } from "lucide-react";
import { Recommendation } from "@/types/chat.types";
import { FALLBACK_PROJECT_IMAGE } from "@/lib/constants";
import { useChatStore } from "@/store/chat.store";

function formatPrice(value?: number) {
  if (!value) return "N/A";
  return `₹${(value / 10000000).toFixed(2)} Cr`;
}

export default function RecommendationCards({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  const { talkToBuilder, runComparison } = useChatStore();

  if (!recommendations.length) return null;

  return (
    <section className="rounded-[32px] border border-[#eceaf7] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Top Recommendations for You</h2>
          <p className="text-sm text-gray-500">Curated by ARKHA AI</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {recommendations.slice(0, 3).map((rec) => {
          const project = rec.projectId;
          const image =
            project.image || project.imageUrls?.[0] || FALLBACK_PROJECT_IMAGE;

          return (
            <div
              key={rec._id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white"
            >
              <div className="relative h-44">
                <img
                  src={image}
                  alt={project.name}
                  className="h-full w-full object-cover"
                />

                <span className="absolute left-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                  {rec.confidenceScore}% Confidence
                </span>

                <Heart size={18} className="absolute right-3 top-3 text-white" />
              </div>

              <div className="p-5">
                <h3 className="font-bold">{project.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{project.location}</p>

                <p className="mt-3 text-sm font-bold">
                  {formatPrice(project.priceMin)} - {formatPrice(project.priceMax)}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {project.unitTypes?.join(", ")} · {project.propertyType}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {rec.reasons?.slice(0, 3).map((reason) => (
                    <li key={reason}>✓ {reason}</li>
                  ))}
                </ul>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => talkToBuilder(project)}
                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold"
                  >
                    Talk
                  </button>

                  <button
                    onClick={() => runComparison([project._id])}
                    className="rounded-xl bg-[#5b43ff] px-4 py-3 text-sm font-semibold text-white"
                  >
                    Compare
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}