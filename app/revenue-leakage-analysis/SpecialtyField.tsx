"use client";

import { useState } from "react";

/**
 * Specialty field for the RLA intake form.
 *
 * Renders a select with our 9 core specialties + "Other". When "Other" is
 * selected, a second text input appears where the lead can type their actual
 * specialty. The typed value is submitted to Formspree as `specialtyOther`,
 * which we read when fulfilling the report.
 */
export default function SpecialtyField({
  options,
}: {
  options: readonly string[];
}) {
  const [value, setValue] = useState("");
  const isOther = value === "Other";

  return (
    <>
      <label className="block">
        <span className="text-sm font-medium text-navy-800">
          Specialty
          <span className="text-crimson"> *</span>
        </span>
        <select
          name="specialty"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1 w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm focus:border-navy-800 focus:outline-none"
        >
          <option value="" disabled>
            Select one
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>

      {isOther && (
        <label className="block">
          <span className="text-sm font-medium text-navy-800">
            If Other, please specify
            <span className="text-crimson"> *</span>
          </span>
          <input
            type="text"
            name="specialtyOther"
            required
            placeholder="e.g. Urology, Dermatology, OB/GYN"
            className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm focus:border-navy-800 focus:outline-none"
          />
        </label>
      )}
    </>
  );
}
