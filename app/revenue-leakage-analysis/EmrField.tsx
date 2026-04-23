"use client";

import { useState } from "react";

/**
 * EMR / PM system field for the RLA intake form.
 *
 * Renders a select with common EMR/PM options + "Other / Not sure". When
 * "Other" is selected, a text input appears so the lead can type their
 * actual system. Submitted to Formspree as `emrOther`.
 */
export default function EmrField({
  options,
}: {
  options: readonly string[];
}) {
  const [value, setValue] = useState("");
  const isOther = value === "Other / Not sure";

  return (
    <>
      <label className="block">
        <span className="text-sm font-medium text-navy-800">
          Current EMR / PM system
        </span>
        <select
          name="emr"
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
            If other, please specify
          </span>
          <input
            type="text"
            name="emrOther"
            placeholder="e.g. Practice Fusion, eMDs, Allscripts"
            className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2 text-sm focus:border-navy-800 focus:outline-none"
          />
        </label>
      )}
    </>
  );
}
