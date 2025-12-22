import React from "react";

export default function FacilityTable({ facilities, setFacilities }) {
  const addRow = () => setFacilities([...facilities, { type: "", sanctioned: 0, balance: 0, headroom: 0 }]);

  const updateRow = (index, field, value) => {
    const temp = [...facilities];
    temp[index][field] = field === "type" ? value : Number(value);
    temp[index].headroom = temp[index].sanctioned - temp[index].balance;
    setFacilities(temp);
  };

  const removeRow = (index) => setFacilities(facilities.filter((_, i) => i !== index));

  const subtotal = facilities.reduce(
    (acc, f) => {
      acc.sanctioned += f.sanctioned;
      acc.balance += f.balance;
      acc.headroom += f.headroom;
      return acc;
    },
    { sanctioned: 0, balance: 0, headroom: 0 }
  );

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">FACILITY TABLE — KES ‘000</div>
        <button
          onClick={addRow}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          + Add Row
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-[#003366] text-white">
            <tr>
              <th className="border p-2">Type</th>
              <th className="border p-2">Sanctioned Limit</th>
              <th className="border p-2">Balance</th>
              <th className="border p-2">Headroom</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((f, i) => (
              <tr key={i} className="bg-gray-50">
                <td className="border p-2">
                  <input
                    type="text"
                    value={f.type}
                    onChange={(e) => updateRow(i, "type", e.target.value)}
                    className="w-full border rounded p-1 text-sm"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={f.sanctioned}
                    onChange={(e) => updateRow(i, "sanctioned", e.target.value)}
                    className="w-full border rounded p-1 text-sm"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={f.balance}
                    onChange={(e) => updateRow(i, "balance", e.target.value)}
                    className="w-full border rounded p-1 text-sm"
                  />
                </td>
                <td className="border p-2">{f.headroom}</td>
                <td className="border p-2 text-center">
                  <button className="text-red-600 font-bold" onClick={() => removeRow(i)}>✕</button>
                </td>
              </tr>
            ))}
            <tr className="font-semibold bg-gray-200">
              <td className="border p-2">Sub-Total</td>
              <td className="border p-2">{subtotal.sanctioned}</td>
              <td className="border p-2">{subtotal.balance}</td>
              <td className="border p-2">{subtotal.headroom}</td>
              <td className="border p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
