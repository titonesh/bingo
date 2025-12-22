import React, { useState } from "react";
import CustomerSearchModal from "../../components/deferrals/CustomerSearchModal";
import ApproverSelector from "../../components/deferrals/ApproverSelector";
import FileUploader from "../../components/deferrals/FileUploader";
import FacilityTable from "../../components/deferrals/FacilityTable";
import DocumentPicker from "../../components/deferrals/DocumentPicker";

export default function DeferralForm({ userId, onSuccess }) {
  // ----------------------
  // STATES
  // ----------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerFetched, setIsCustomerFetched] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");

  const [approvers, setApprovers] = useState([""]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const [deferralTitle, setDeferralTitle] = useState("");
  const [deferralType, setDeferralType] = useState("");
  const [daysSought, setDaysSought] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [originalDueDate, setOriginalDueDate] = useState("");
  const [previousDeferredDays, setPreviousDeferredDays] = useState([10]);
  const [daysSoughtRows, setDaysSoughtRows] = useState([10]);
  const [cumulativeDeferredDays, setCumulativeDeferredDays] = useState([20]);
  const [dclNumber, setDclNumber] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  // ----------------------
  // HANDLERS
  // ----------------------
  const fetchCustomer = async (custNumber, loanType) => {
    try {
      setIsFetching(true);

      // mock data
      const data = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              customerName: "ERIC MEWA",
              businessName: "MEWA AND SONS LIMITED",
              customerNumber: "123456",
              accountNumber: "1234567890",
              accountType: "Business Current",
            }),
          1000
        )
      );

      setCustomerName(data.customerName);
      setBusinessName(data.businessName);
      setCustomerNumber(data.customerNumber);
      setAccountNumber(data.accountNumber);
      setAccountType(data.accountType);

      setDeferralTitle(`${data.customerName} — ${data.businessName}`);

      setIsCustomerFetched(true);
      setIsModalOpen(false);
    } finally {
      setIsFetching(false);
    }
  };

  const addApprover = () => setApprovers([...approvers, ""]);
  const updateApprover = (index, value) => {
    const arr = [...approvers];
    arr[index] = value;
    setApprovers(arr);
  };
  const removeApprover = (index) =>
    setApprovers(approvers.filter((_, i) => i !== index));

  // ---------------------------------------------------
  // SUBMIT DEFERRAL
  // ---------------------------------------------------
  const handleSubmitDeferral = () => {
    const newDeferral = {
      deferralNumber: `DF-${Date.now()}`,
      customerName,
      businessName,
      customerNumber,
      accountNumber,
      accountType,
      deferralTitle,
      deferralType,
      daysSought,
      nextDueDate,
      originalDueDate,
      previousDeferredDays,
      daysSoughtRows,
      cumulativeDeferredDays,
      facilities,
      selectedDocuments,
      approverFlow: approvers,
      currentApprover: approvers[0] || "Not Assigned",
      status: "Pending",
      dclNumber,
    };

    // You would typically call an API here
    console.log("Submitting deferral:", newDeferral);
    
    if (onSuccess) {
      onSuccess();
    }
    
    alert("Deferral submitted successfully!");
    
    // Reset form
    setIsCustomerFetched(false);
    setCustomerName("");
    setBusinessName("");
    setCustomerNumber("");
    setAccountNumber("");
    setAccountType("");
    setApprovers([""]);
    setSelectedDocuments([]);
    setFacilities([]);
    setDeferralTitle("");
    setDeferralType("");
    setDaysSought("");
    setNextDueDate("");
    setOriginalDueDate("");
    setDclNumber("");
    setLoanAmount("");
  };

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        {!isCustomerFetched && (
          <div className="bg-white p-8 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#1E2B5F]">
              Start New Deferral Request
            </h2>
            <p className="text-gray-600 mb-6">
              Please search for a customer to begin the deferral request process.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1E2B5F] text-white px-6 py-3 rounded-lg hover:bg-[#151f4a] transition"
              disabled={isFetching}
            >
              {isFetching ? "Searching..." : "Search Customer"}
            </button>
          </div>
        )}

        {isCustomerFetched && (
          <div className="space-y-6">
            {/* CUSTOMER INFO */}
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#1E2B5F]">
                Customer Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <label className="text-xs uppercase text-gray-500">Customer Name</label>
                  <p className="text-base font-semibold mt-1">{customerName}</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <label className="text-xs uppercase text-gray-500">Business Name</label>
                  <p className="text-base font-semibold mt-1">{businessName}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <label className="text-xs uppercase text-gray-500">Customer Number</label>
                  <p className="text-base font-semibold mt-1">{customerNumber}</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <label className="text-xs uppercase text-gray-500">Account Number</label>
                  <p className="text-base font-semibold mt-1">{accountNumber}</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <label className="text-xs uppercase text-gray-500">Account Type</label>
                  <p className="text-base font-semibold mt-1">{accountType}</p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-white p-6 rounded-lg shadow space-y-6">
              <h2 className="text-xl font-semibold text-[#1E2B5F]">
                Deferral Details
              </h2>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Deferral Title
                </label>
                <input
                  type="text"
                  value={deferralTitle}
                  onChange={(e) => setDeferralTitle(e.target.value)}
                  className="w-full border p-2 rounded text-sm"
                />
              </div>

              {/* Loan Amount Dropdown */}
              <div>
                <label className="text-sm font-semibold">Loan Amount</label>
                <select
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full border rounded mt-1 p-3 text-sm"
                >
                  <option value="">Select loan amount</option>
                  <option value="below75">Below 75 million</option>
                  <option value="above75">Above 75 million</option>
                </select>
              </div>

              {/* Deferral Type */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold">Deferral Type</label>
                  <select
                    value={deferralType}
                    onChange={(e) => setDeferralType(e.target.value)}
                    className="w-full border rounded mt-1 p-3 text-sm"
                  >
                    <option value="">Select type</option>
                    <option value="New">New</option>
                    <option value="Extension">Extension</option>
                  </select>
                </div>

                {deferralType === "New" && (
                  <>
                    <div>
                      <label className="text-sm font-semibold">No. of Days Sought</label>
                      <select
                        value={daysSought}
                        onChange={(e) => setDaysSought(e.target.value)}
                        className="w-full border rounded mt-1 p-3 text-sm"
                      >
                        <option value="">Select number of days</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold">Next Document Due Date</label>
                      <input
                        type="date"
                        value={nextDueDate}
                        onChange={(e) => setNextDueDate(e.target.value)}
                        className="w-full border rounded mt-1 p-3 text-sm"
                      />
                    </div>
                  </>
                )}

                {deferralType === "Extension" && (
                  <div>
                    <label className="text-sm font-semibold">Original Due Date</label>
                    <input
                      type="date"
                      value={originalDueDate}
                      onChange={(e) => setOriginalDueDate(e.target.value)}
                      className="w-full border rounded mt-1 p-3 text-sm"
                    />
                  </div>
                )}
              </div>

              {/* EXTENSION TABLE */}
              {deferralType === "Extension" && (
                <div className="border rounded p-4 bg-gray-50">
                  <h3 className="font-semibold mb-3 text-[#1E2B5F]">Extension Details</h3>

                  <table className="w-full border-collapse text-sm mb-4">
                    <thead>
                      <tr className="bg-[#1E2B5F] text-white">
                        <th className="p-2">Previous Deferred Days</th>
                        <th className="p-2">Days Sought</th>
                        <th className="p-2">Cumulative Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previousDeferredDays.map((prev, idx) => (
                        <tr key={idx}>
                          <td className="border p-2">
                            <select
                              value={prev}
                              onChange={(e) => {
                                const newPrev = [...previousDeferredDays];
                                newPrev[idx] = Number(e.target.value);
                                setPreviousDeferredDays(newPrev);

                                const newCum = [...cumulativeDeferredDays];
                                newCum[idx] = newPrev[idx] + daysSoughtRows[idx];
                                setCumulativeDeferredDays(newCum);
                              }}
                              className="w-full border rounded p-1"
                            >
                              <option>10</option>
                              <option>20</option>
                              <option>30</option>
                              <option>45</option>
                            </select>
                          </td>

                          <td className="border p-2">
                            <select
                              value={daysSoughtRows[idx]}
                              onChange={(e) => {
                                const newDays = [...daysSoughtRows];
                                newDays[idx] = Number(e.target.value);
                                setDaysSoughtRows(newDays);

                                const newCum = [...cumulativeDeferredDays];
                                newCum[idx] = previousDeferredDays[idx] + newDays[idx];
                                setCumulativeDeferredDays(newCum);
                              }}
                              className="w-full border rounded p-1"
                            >
                              <option>10</option>
                              <option>20</option>
                              <option>30</option>
                              <option>45</option>
                            </select>
                          </td>

                          <td className="border p-2">
                            <input
                              type="number"
                              value={cumulativeDeferredDays[idx]}
                              readOnly
                              className="w-full border p-1 rounded bg-gray-100"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <DocumentPicker
                selectedDocuments={selectedDocuments}
                setSelectedDocuments={setSelectedDocuments}
              />

              <div>
                <label className="block text-sm font-medium mb-1">Deferral Description</label>
                <textarea className="w-full border p-2 rounded" rows={4}></textarea>
              </div>

              <FacilityTable facilities={facilities} setFacilities={setFacilities} />

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">DCL Number</label>
                <input
                  type="text"
                  value={dclNumber}
                  onChange={(e) => setDclNumber(e.target.value)}
                  className="w-full border p-2 rounded text-sm"
                  placeholder="Enter DCL number"
                />
              </div>

              <FileUploader title="Mandatory: DCL Upload" isMandatory disabled={!dclNumber} />
              <FileUploader title="Attach Additional Documents" />
            </div>
          </div>
        )}
      </div>

      {/* Right sidebar for approver selection */}
      {isCustomerFetched && (
        <div className="w-80 p-6 border-l bg-white">
          <h3 className="text-lg font-semibold mb-4 text-[#1E2B5F]">Approver Flow</h3>
          <ApproverSelector
            approvers={approvers}
            addApprover={addApprover}
            updateApprover={updateApprover}
            removeApprover={removeApprover}
          />

          <button
            onClick={handleSubmitDeferral}
            className="mt-6 w-full bg-[#1E2B5F] text-white py-3 rounded-lg hover:bg-[#151f4a] transition"
          >
            Submit Deferral
          </button>
        </div>
      )}

      <CustomerSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={fetchCustomer}
        isFetching={isFetching}
      />
    </div>
  );
}

