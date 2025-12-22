import React, { useState } from "react";

export default function CustomerSearchModal({ isOpen, onClose, onSubmit, isFetching }) {
  const [customerNumber, setCustomerNumber] = useState("");
  const [loanType, setLoanType] = useState("");
 
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Request Deferral — Fetch Customer</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(customerNumber, loanType);
          }}
          className="space-y-4"
        >
          {/* Customer Number Input */}
          <div>
            <label className="text-sm font-medium">Customer Number</label>
            <input
              type="text"
              inputMode="numeric"
              className="w-full border rounded mt-1 p-2 text-sm"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 123456"
              required
            />
          </div>

          {/* Loan Type Dropdown */}
          <div>
            <label className="text-sm font-medium">Loan Type</label>
            <select
              className="w-full border rounded mt-1 p-2 text-sm"
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              required
            >
              <option value="">Select loan type</option>
              <option value="asset finance">Asset Finance</option>
              <option value="business loan">Business Loan</option>
              <option value="consumer">Consumer</option>
              <option value="mortgage">Mortgage</option>
              <option value="construction">Construction Loan</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border rounded text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-sm text-white ${
                isFetching ? "bg-gray-500 cursor-not-allowed" : "bg-[#0A1A44] hover:bg-[#081533]"
              }`}
              disabled={isFetching}
            >
              {isFetching ? "Fetching..." : "Fetch Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
