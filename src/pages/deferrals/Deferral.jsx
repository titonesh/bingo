import React, { useState } from "react";
import CustomerSearchModal from "../../components/deferrals/CustomerSearchModal";
import ApproverSelector from "../../components/deferrals/ApproverSelector";
import FileUploader from "../../components/deferrals/FileUploader";
import FacilityTable from "../../components/deferrals/FacilityTable";
import DocumentPicker from "../../components/deferrals/DocumentPicker";


export default function Deferral() {
  // ----------------------
  // STATES
  // ----------------------
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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

  const [activePage, setActivePage] = useState("form");

  // ----------------------
  // PENDING DEFERRALS STATE (with demo data)
  // ----------------------
  const [pendingDeferrals, setPendingDeferrals] = useState([
    {
      deferralNumber: "DEF-001",
      title: "Bank Statements",
      status: "Pending",
      currentApprover: "Diana Jebet",
      previousApprovers: ["Pascal Kariuki", "Emmanuel Nzeki"],
      createdAt: "2025-01-05",
      customerName: "Javan Dave",
      businessName: "JAVAN DAVE AND SONS",
    },
    {
      deferralNumber: "DEF-002",
      title: "CR12 Certificate",
      status: "Pending",
      currentApprover: "Raphael Eric",
      previousApprovers: ["Shallot Maala"],
      createdAt: "2025-01-11",
      customerName: "Diana Mwangi",
      businessName: "DIANA MWANGI AND DAUGHTERS",
    },
    {
      deferralNumber: "DEF-003",
      title: "Lease Agreement",
      status: "Pending",
      currentApprover: "Titus Munene",
      previousApprovers: ["Pascal Kariuki", "Raphael Eric"],
      createdAt: "2025-01-20",
      customerName: "Lucy Nyambura",
      businessName: "LUCY NYAMBURA AND SONS",
    },
  ]);

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

    setPendingDeferrals((prev) => [...prev, newDeferral]);
    setActivePage("pending");

    alert("Deferral submitted successfully!");
  };

  // ---------------------------------------------------
  // PENDING DEFERRALS PAGE RENDER
  // ---------------------------------------------------
  const renderPending = () => (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-[#003366]">
        Pending Deferrals
      </h1>

      {pendingDeferrals.length === 0 ? (
        <p className="text-gray-500 text-lg">No pending deferrals found.</p>
      ) : (
        <div className="space-y-4">
          {pendingDeferrals.map((d, idx) => (
            <div key={idx} className="border p-4 bg-white rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg text-[#003366] mb-1">{d.deferralNumber}</h2>
              <p><strong>Customer:</strong> {d.customerName}</p>
              <p><strong>Business:</strong> {d.businessName}</p>
              <p><strong>Status:</strong> {d.status}</p>
              <p><strong>Approver:</strong> {d.currentApprover}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ---------------------------------------------------
  // DEFERRAL FORM PAGE RENDER
  // ---------------------------------------------------
  const renderForm = () => (
    <div className="flex-1 p-6 overflow-auto">
      {!isCustomerFetched && <div></div>}

      {isCustomerFetched && (
        <div className="space-y-6">
          {/* CUSTOMER INFO */}
          <div className="mt-6 bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#003366]">
              Customer Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <label className="text-xs uppercase">Customer Name</label>
                <p className="text-base font-semibold mt-1">{customerName}</p>
              </div>

              <div className="p-4 border rounded-lg">
                <label className="text-xs uppercase">Business Name</label>
                <p className="text-base font-semibold mt-1">{businessName}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg mt-4">
              <label className="text-xs uppercase">Customer Number</label>
              <p className="text-base font-semibold mt-1">{customerNumber}</p>
            </div>

            <div className="p-4 border rounded-lg mt-4">
              <label className="text-xs uppercase">Account Number</label>
              <p className="text-base font-semibold mt-1">{accountNumber}</p>
            </div>

            <div className="p-4 border rounded-lg mt-4">
              <label className="text-xs uppercase">Account Type</label>
              <p className="text-base font-semibold mt-1">{accountType}</p>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-4 rounded shadow space-y-4">
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
            <div className="grid grid-cols-3 gap-4 mb 6">
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
              <div className="mb-6 border rounded p-4 bg-white">
                <h3 className="font-semibold mb-3 text-[#003366]">Extension Details</h3>

                <table className="w-full border-collapse text-sm mb-4">
                  <thead>
                    <tr className="bg-[#003366] text-white">
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
  );

  // ---------------------------------------------------
  // MAIN JSX
  // ---------------------------------------------------
  return (
    <div className="flex h-screen font-sans text-gray-700">
      {/* LEFT SIDEBAR */}
      <div
        className={`bg-[#1E2B5F] text-white ${
          isSidebarCollapsed ? "w-16" : "w-64"
        } transition-width duration-300 flex flex-col`}
      >
        <div className="p-4 font-bold text-xl">
          {isSidebarCollapsed ? "DF" : "Deferrals"}
        </div>

        <button className="p-3 hover:bg-[#0A1A44] text-left" onClick={() => setIsModalOpen(true)}>
          {isSidebarCollapsed ? "RD" : "Request Deferral"}
        </button>

        <button className="p-3 hover:bg-[#0A1A44] text-left" onClick={() => setActivePage("pending")}>
          {isSidebarCollapsed ? "PD" : "Pending Deferrals"}
        </button>
      </div>

      {/* MAIN CONTENT SWITCHER */}
      {activePage === "pending" ? renderPending() : renderForm()}

      {/* RIGHT SIDEBAR */}
      {isCustomerFetched && activePage !== "pending" && (
        <div className="w-80 p-4 border-l bg-white">
          <ApproverSelector
            approvers={approvers}
            addApprover={addApprover}
            updateApprover={updateApprover}
            removeApprover={removeApprover}
          />

          <button
            onClick={handleSubmitDeferral}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
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
