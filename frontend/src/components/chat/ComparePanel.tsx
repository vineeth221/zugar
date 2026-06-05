"use client";

import { useChatStore } from "@/store/chat.store";

export default function ComparePanel() {
  const { comparison } = useChatStore();

  if (!comparison.length) return null;

  return (
    <section className="rounded-[32px] border border-[#eceaf7] bg-[#f7f3ff] p-6 shadow-sm">
      <h2 className="text-xl font-bold">Compare like a pro</h2>
      <p className="mt-1 text-sm text-gray-500">
        ARKHA compares projects across what matters.
      </p>

      <div className="mt-5 overflow-x-auto rounded-2xl bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-4">Project</th>
              <th className="p-4">Builder</th>
              <th className="p-4">Location</th>
              <th className="p-4">Schools</th>
              <th className="p-4">Risk</th>
              <th className="p-4">Overall Fit</th>
            </tr>
          </thead>

          <tbody>
            {comparison.map((item: any) => (
              <tr key={item.projectId} className="border-b">
                <td className="p-4 font-semibold">{item.name}</td>
                <td className="p-4">{item.builder}</td>
                <td className="p-4">{item.location}</td>
                <td className="p-4">{item.schools}</td>
                <td className="p-4">{item.riskLevel}</td>
                <td className="p-4 font-bold text-[#5b43ff]">
                  {item.overallFit}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}