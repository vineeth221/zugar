"use client";

import { useState } from "react";
import { Home, MapPin, Target, Users } from "lucide-react";
import { Preference } from "@/types/chat.types";
import { useChatStore } from "@/store/chat.store";

const budgets = [
  { label: "Under ₹1 Cr", min: 0, max: 10000000 },
  { label: "₹1 Cr - ₹2 Cr", min: 10000000, max: 20000000 },
  { label: "₹2 Cr - ₹5 Cr", min: 20000000, max: 50000000 },
  { label: "Above ₹5 Cr", min: 50000000, max: 100000000 },
];

const locations = ["Sarjapur", "Whitefield", "HSR Layout", "North Bangalore"];
const priorities = ["Schools", "Commute", "Appreciation", "Lifestyle", "Rental Yield"];

export default function PreferenceForm() {
  const { submitPreference, isGenerating } = useChatStore();

  const [preference, setPreference] = useState<Preference>({
    purpose: "end_use",
    budgetMin: 20000000,
    budgetMax: 50000000,
    propertyTypes: ["Villa"],
    locations: ["Sarjapur"],
    priorities: ["Schools", "Commute", "Appreciation"],
    schoolsRequired: true,
  });

  const toggleValue = (key: "locations" | "priorities" | "propertyTypes", value: string) => {
    const current = preference[key] || [];
    const exists = current.includes(value);

    setPreference({
      ...preference,
      [key]: exists
        ? current.filter((item) => item !== value)
        : [...current, value],
    });
  };

  const selectBudget = (budget: (typeof budgets)[number]) => {
    setPreference({
      ...preference,
      budgetMin: budget.min,
      budgetMax: budget.max,
    });
  };

  return (
    <section className="rounded-[32px] border border-[#eceaf7] bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-gray-950">
          Tell us about your home needs
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Answer a few questions and ARKHA will do the magic ✨
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-4">
        <div className="rounded-3xl border border-gray-200 p-5">
          <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#eeeaff] text-sm font-bold text-[#5b43ff]">
            1
          </div>

          <h3 className="text-sm font-bold">What’s your budget?</h3>
          <p className="mt-1 text-xs text-gray-500">All inclusive</p>

          <div className="mt-4 space-y-3">
            {budgets.map((budget) => {
              const active =
                preference.budgetMin === budget.min &&
                preference.budgetMax === budget.max;

              return (
                <button
                  key={budget.label}
                  onClick={() => selectBudget(budget)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm ${
                    active
                      ? "border-[#6d5cff] bg-[#f4f1ff] text-[#5b43ff]"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {budget.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 p-5">
          <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#eeeaff] text-sm font-bold text-[#5b43ff]">
            2
          </div>

          <h3 className="text-sm font-bold">What are you buying for?</h3>

          <div className="mt-4 space-y-3">
            {[
              ["end_use", "End Use", Home],
              ["investment", "Investment", Target],
              ["both", "Both", Users],
            ].map(([value, label, Icon]: any) => (
              <button
                key={value}
                onClick={() =>
                  setPreference({
                    ...preference,
                    purpose: value,
                  })
                }
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm ${
                  preference.purpose === value
                    ? "border-[#6d5cff] bg-[#f4f1ff] text-[#5b43ff]"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 p-5">
          <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#eeeaff] text-sm font-bold text-[#5b43ff]">
            3
          </div>

          <h3 className="text-sm font-bold">Preferred locations</h3>
          <p className="mt-1 text-xs text-gray-500">Select all that apply</p>

          <div className="mt-4 space-y-3">
            {locations.map((location) => {
              const active = preference.locations.includes(location);

              return (
                <button
                  key={location}
                  onClick={() => toggleValue("locations", location)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm ${
                    active
                      ? "border-[#6d5cff] bg-[#f4f1ff] text-[#5b43ff]"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <MapPin size={15} />
                  {location}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 p-5">
          <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#eeeaff] text-sm font-bold text-[#5b43ff]">
            4
          </div>

          <h3 className="text-sm font-bold">What matters most?</h3>
          <p className="mt-1 text-xs text-gray-500">Choose your priorities</p>

          <div className="mt-4 space-y-3">
            {priorities.map((priority) => {
              const active = preference.priorities.includes(priority);

              return (
                <button
                  key={priority}
                  onClick={() => toggleValue("priorities", priority)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm ${
                    active
                      ? "border-[#6d5cff] bg-[#f4f1ff] text-[#5b43ff]"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {priority}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        disabled={isGenerating}
        onClick={() => submitPreference(preference)}
        className="mt-6 rounded-2xl bg-[#5b43ff] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 disabled:opacity-50"
      >
        {isGenerating ? "ARKHA is analysing..." : "Generate My Home Fit Score"}
      </button>
    </section>
  );
}