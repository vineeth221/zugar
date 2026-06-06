"use client";

import { useState } from "react";
import { Home, MapPin, Target, Users, Building2 } from "lucide-react";
import { Preference } from "@/types/chat.types";
import { useChatStore } from "@/store/chat.store";

const budgets = [
  { label: "Under ₹1 Cr", min: 0, max: 10000000 },
  { label: "₹1 Cr - ₹2 Cr", min: 10000000, max: 20000000 },
  { label: "₹2 Cr - ₹5 Cr", min: 20000000, max: 50000000 },
  { label: "Above ₹5 Cr", min: 50000000, max: 100000000 },
];

const propertyTypes = ["Apartment", "Villa", "Plot"];
const locations = ["Sarjapur", "Whitefield", "HSR Layout", "North Bangalore"];
const priorities = ["Schools", "Commute", "Appreciation", "Lifestyle", "Rental Yield"];

export default function PreferenceForm() {
  const { submitPreference, isGenerating } = useChatStore();

  const [preference, setPreference] = useState<Preference>({
    purpose: "end_use",
    budgetMin: 0,
    budgetMax: 50000000,
    propertyTypes: [],
    locations: [],
    priorities: [],
    schoolsRequired: false,
  });

  const toggleValue = (
    key: "locations" | "priorities" | "propertyTypes",
    value: string
  ) => {
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

  const canSubmit =
    preference.budgetMax &&
    preference.locations.length > 0 &&
    preference.propertyTypes.length > 0;

  return (
    <section className="rounded-[32px] border border-[#eceaf7] bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-gray-950">
          Tell us about your home needs
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Select your requirement and ARKHA will show matching projects.
        </p>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-5">
        <Card step="1" title="Budget">
          {budgets.map((budget) => {
            const active =
              preference.budgetMin === budget.min &&
              preference.budgetMax === budget.max;

            return (
              <Option
                key={budget.label}
                active={active}
                label={budget.label}
                onClick={() => selectBudget(budget)}
              />
            );
          })}
        </Card>

        <Card step="2" title="Purpose">
          {[
            ["end_use", "End Use", Home],
            ["investment", "Investment", Target],
            ["both", "Both", Users],
          ].map(([value, label, Icon]: any) => (
            <Option
              key={value}
              active={preference.purpose === value}
              label={label}
              Icon={Icon}
              onClick={() =>
                setPreference({
                  ...preference,
                  purpose: value,
                })
              }
            />
          ))}
        </Card>

        <Card step="3" title="Property Type">
          {propertyTypes.map((type) => (
            <Option
              key={type}
              active={preference.propertyTypes.includes(type)}
              label={type}
              Icon={Building2}
              onClick={() => toggleValue("propertyTypes", type)}
            />
          ))}
        </Card>

        <Card step="4" title="Location">
          {locations.map((location) => (
            <Option
              key={location}
              active={preference.locations.includes(location)}
              label={location}
              Icon={MapPin}
              onClick={() => toggleValue("locations", location)}
            />
          ))}
        </Card>

        <Card step="5" title="Priorities">
          {priorities.map((priority) => (
            <Option
              key={priority}
              active={preference.priorities.includes(priority)}
              label={priority}
              onClick={() => toggleValue("priorities", priority)}
            />
          ))}
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          disabled={!canSubmit || isGenerating}
          onClick={() => submitPreference(preference)}
          className="rounded-2xl bg-[#5b43ff] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isGenerating ? "Finding Projects..." : "Show Recommended Projects"}
        </button>
      </div>
    </section>
  );
}

function Card({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 p-5">
      <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#eeeaff] text-sm font-bold text-[#5b43ff]">
        {step}
      </div>
      <h3 className="text-sm font-bold">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Option({
  active,
  label,
  onClick,
  Icon,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  Icon?: any;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
        active
          ? "border-[#6d5cff] bg-[#f4f1ff] text-[#5b43ff]"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {Icon && <Icon size={15} />}
      {label}
    </button>
  );
}