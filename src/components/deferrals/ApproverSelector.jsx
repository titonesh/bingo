import React from "react";

export default function ApproverSelector({
  approvers,
  updateApprover,
  addApprover,
  removeApprover,
  onSubmitDeferral,
  isSubmitting
}) {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-300 p-6 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Approver Selection</h2>
      <p className="text-sm text-gray-600 mb-4">
        Select approver(s) for this deferral request.
      </p>

      {approvers.map((approver, index) => (
        <div key={index} className="mb-4">
          <label className="text-sm font-medium block mb-1">
            Approver {index + 1}
          </label>
          <select
            value={approver}
            onChange={(e) => updateApprover(index, e.target.value)}
            className="w-full border p-2 rounded-lg bg-gray-50"
          >
            <option value="">-- Choose Approver --</option>
            <option value="James Mwangi">James Mwangi</option>
            <option value="Grace Nduta">Grace Nduta</option>
            <option value="Patrick Maingi">Patrick Maingi</option>
            <option value="Sarah Wambui">Sarah Wambui</option>
            <option value="Anthony Kariuki">Anthony Kariuki</option>
          </select>

          {approvers.length > 1 && (
            <button
              className="text-red-600 text-sm mt-2"
              onClick={() => removeApprover(index)}
            >
              Remove Approver
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addApprover}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg mt-2 shadow-md transition"
      >
        + Add Another Approver
      </button>

      <button
        onClick={onSubmitDeferral}
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg mt-4 shadow-md transition disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Deferral"}
      </button>
    </div>
  );
}

