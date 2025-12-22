import React, { useState } from "react";

export default function DocumentPicker({ selectedDocuments, setSelectedDocuments }) {
  const [search, setSearch] = useState("");

  const allDocuments = [
    // Primary Documents
    { name: "Offer Letter (new facilities)", type: "Primary", category: "Non-Allowable" },
    { name: "Letter of Variation of facilities", type: "Primary", category: "Non-Allowable" },
    { name: "Board Resolutions by borrowers and guarantors", type: "Primary", category: "Non-Allowable" },
    { name: "Loan Agreements (Master Asset Finance agreement, Hire Purchase Agreement, Securities Agreement, Agency Agreement etc.)", type: "Primary", category: "Non-Allowable" },
    { name: "Inter-lenders Agreements", type: "Primary", category: "Non-Allowable" },
    { name: "Debentures plus supporting documentation", type: "Primary", category: "Non-Allowable" },
    { name: "Letters of Exclusion from debentures or receivables", type: "Primary", category: "Non-Allowable" },
    { name: "Legal Charges plus supporting documentation", type: "Primary", category: "Non-Allowable" },
    { name: "Further charges (up stamping) on existing legal charges & debentures*", type: "Primary", category: "Allowable" },
    { name: "Letter of Lien (any type)/letter of set off/memorandum of general pledge", type: "Primary", category: "Non-Allowable" },
    { name: "Cash Cover", type: "Primary", category: "Allowable" },
    { name: "Joint Registrations of assets", type: "Primary", category: "Non-Allowable" },
    { name: "Execution of Documents by Motor Vehicle Dealers", type: "Primary", category: "Non-Allowable" },
    { name: "Final Invoices for settlement", type: "Primary", category: "Non-Allowable" },
    { name: "Shares and bonds", type: "Primary", category: "Non-Allowable" },
    { name: "Insurance for assets financed", type: "Primary", category: "Non-Allowable" },
    { name: "Evidence of payment of full deposit amounts (borrowers contribution) before drawdown", type: "Primary", category: "Non-Allowable" },
    { name: "Tracking certificates", type: "Primary", category: "Non-Allowable" },
    { name: "Memorandum and Articles of Association, or amendments of the same where the facility has already been approved for a new to Bank client", type: "Primary", category: "Non-Allowable" },
    { name: "Affidavit of Title", type: "Primary", category: "Non-Allowable" },
    { name: "Sale agreement", type: "Primary", category: "Non-Allowable" },
    { name: "Offer Letter (Straight annual reviews) - to pursued as limit extensions and not deferrals", type: "Primary", category: "Non-Allowable" },
    { name: "Any New Guarantees (director, company, property owners’ guarantee etc.) and Indemnities", type: "Primary", category: "Non-Allowable" },
    { name: "Deeds of Assignment of Incomes and Receivables", type: "Primary", category: "Non-Allowable" },
    { name: "Deeds of Indemnity", type: "Primary", category: "Non-Allowable" },
    { name: "Deeds of Subordination", type: "Primary", category: "Allowable" },
    { name: "Statements of Assets and Liabilities including certificate of compliance to the LOF", type: "Primary", category: "Allowable" },
    { name: "Valuations / Re-valuations for purpose of up-stamping of securities", type: "Primary", category: "Non-Allowable" },
    { name: "Re-valuation (normal revaluation after 4 years)", type: "Primary", category: "Allowable" },
    { name: "Company searches", type: "Primary", category: "Non-Allowable" },
    { name: "Collection of Bank Charges", type: "Primary", category: "Allowable" },
    { name: "Import entry and corresponding duty payment receipts for vehicles financed", type: "Primary", category: "Non-Allowable" },
    { name: "Receipt of original logbooks in the name of the seller", type: "Primary", category: "Allowable" },
    { name: "Current Vehicle Inspection Reports", type: "Primary", category: "Allowable" },
    { name: "Machine/Equipment Warranties", type: "Primary", category: "Allowable" },
    { name: "Change of payee(s) or details of payee(s)", type: "Primary", category: "Non-Allowable" },
    { name: "For All Construction Related Credit Facilities Prior to Disbursement: architects certificates, Quantity Surveyor’s Report, Bills of Quantities, certificate of occupation/completion Approved drawings, Contractor’s All Risk Insurance Cover, Professional Certificates, Letters of Undertaking, National Environment Management Authority (NEMA), Energy and Petroleum Regulatory Authority (EPRA) and Road Authorities (KENHA, KURA,KERRA). National Construction Authority Approval, Contractor’s profile, National Construction Authority certificate and Professional Certificates", type: "Primary", category: "Allowable" },
    { name: "Where applicable, Compliance with provisions of the bank’s and the United Nations Environmental and Social Management System (ESMS) and IFC Performance Standards", type: "Primary", category: "Allowable" },
    { name: "Original share certificates (for shares & Bonds held as collateral)Share certificates for sectional units and blank transfer forms.", type: "Primary", category: "Allowable" },
    { name: "Land searches", type: "Primary", category: "Allowable" },
    { name: "Amendments on logbooks (subject to the customer having executed required documentation)", type: "Primary", category: "Allowable" },
    { name: "Commercial Benefit Agreements", type: "Primary", category: "Allowable" },

    // Secondary Documents
    { name: "Annual Returns", type: "Secondary", category: "Non-Allowable" },
    { name: "Tax Compliance Certificates", type: "Secondary", category: "Allowable" },
    { name: "Land Rents & Rates receipts", type: "Secondary", category: "Allowable" },
    { name: "Customer Identification Documents e.g. ID, Passport, KRA PINS", type: "Secondary", category: "Allowable" },
    { name: "Receipt of Final/Original Invoices from off takers, motor vehicle dealers/sellers etc.", type: "Secondary", category: "Allowable" },
    { name: "Employer salary remittance letters and their originals", type: "Secondary", category: "Allowable" },
    { name: "Employer check off letters and their originals", type: "Secondary", category: "Allowable" },
    { name: "Authority to sell letters from the bank’s approved dealers.", type: "Secondary", category: "Allowable" },
    { name: "Provision of sellers bank details", type: "Secondary", category: "Allowable" },
    { name: "Landlords Letter", type: "Secondary", category: "Allowable" },
    { name: "Direct Debit or Standing Order forms/instructions", type: "Secondary", category: "Allowable" },
    { name: "Delivery Notes for equipment/machinery/goods", type: "Secondary", category: "Allowable" },
    { name: "Share of Wallet letter", type: "Secondary", category: "Allowable" },
    { name: "Current CR12", type: "Secondary", category: "Non-Allowable" },
    { name: "Opening of Mpesa Till number/linking to account/Till Transfer linked to account in another bank", type: "Secondary", category: "Non-Allowable" },
    { name: "Occupational safety and health audit reports", type: "Secondary", category: "Non-Allowable" },
  ];

  // ✅ UPDATED handleSelect FUNCTION
  const handleSelect = (doc) => {
    if (!selectedDocuments.includes(doc)) {
      setSelectedDocuments([...selectedDocuments, doc]);
    }

    // CLEAR SEARCH + HIDE RESULTS
    setSearch("");
  };

  const removeDocument = (index) => {
    const temp = [...selectedDocuments];
    temp.splice(index, 1);
    setSelectedDocuments(temp);
  };

  const updateDocumentName = (index, value) => {
    const temp = [...selectedDocuments];
    temp[index].name = value;
    setSelectedDocuments(temp);
  };

  const filteredDocs = allDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Document Name</label>
      <input
        type="text"
        placeholder="Search document..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded mb-1"
      />

      {/* Search Results */}
      {search && (
        <div className="max-h-60 overflow-auto border rounded bg-white shadow">
          {filteredDocs.length === 0 && (
            <div className="p-2 text-gray-500">No documents found</div>
          )}
          {filteredDocs.map((doc, i) => (
            <div
              key={i}
              onClick={() => handleSelect(doc)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {doc.name}
            </div>
          ))}
        </div>
      )}

      {/* Selected Documents */}
      {selectedDocuments.length > 0 && (
        <div className="space-y-1 mt-2">
          <div className="font-medium text-sm">
            Selected Documents ({selectedDocuments.length})
          </div>
          {selectedDocuments.map((doc, i) => (
            <div
              key={i}
              className="flex justify-between items-center border p-2 rounded bg-gray-50 space-x-2"
            >
              {/* Editable Document Name */}
              <input
                type="text"
                value={doc.name}
                onChange={(e) => updateDocumentName(i, e.target.value)}
                className="flex-1 border rounded p-1"
              />
              {/* Type & Category (greyed out) */}
              <div className="flex space-x-1 text-xs text-gray-500 select-none">
                <span>{doc.type}</span>
                <span>{doc.category}</span>
              </div>
              <button
                className="text-red-600 text-sm underline"
                onClick={() => removeDocument(i)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
