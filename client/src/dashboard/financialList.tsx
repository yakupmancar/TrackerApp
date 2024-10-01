import { useState } from "react";
import { useFinancialRecords } from "../context/financialRecordsContext";

const FinancialList = () => {
  const { records, deleteRecord, updateRecord } = useFinancialRecords();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({
    description: "",
    amount: "",
  });

  const handleEditClick = (recordId: string) => {
    const recordToEdit = records.find((record) => record._id === recordId);
    if (recordToEdit) {
      setEditValues({
        description: recordToEdit.description,
        amount: recordToEdit.amount,
      });
      setIsEditing(recordId);
    }
  };

  const handleSave = (id: string) => {
    updateRecord(id, editValues);
    setIsEditing(null);
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto mt-10">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-blue-500 text-gray-100">
          <tr>
            <th className="py-2 px-4 text-left border-b">Description</th>
            <th className="py-2 px-4 text-left border-b">Amount</th>
            <th className="py-2 px-4 text-left border-b">Category</th>
            <th className="py-2 px-4 text-left border-b">Payment Method</th>
            <th className="py-2 px-4 text-left border-b">Date</th>
            <th className="py-2 px-4 text-left border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b cursor-pointer">
                  {isEditing === record._id ? (
                    <input
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          description: e.target.value,
                        })
                      }
                      type="text"
                      className="border rounded px-2 py-1 w-full border-gray-400"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(record._id ?? "")}>
                      {record.description}
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 border-b cursor-pointer">
                  {isEditing === record._id ? (
                    <input
                      value={editValues.amount}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          amount: e.target.value,
                        })
                      }
                      type="text"
                      className="border border-gray-400 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <span onClick={() => handleEditClick(record._id ?? "")}>
                      {record.amount}
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">{record.category}</td>
                <td className="py-2 px-4 border-b">{record.paymentMethod}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => deleteRecord(record._id ?? "")}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                  {isEditing === record._id && (
                    <button
                      onClick={() => handleSave(record._id ?? "")}
                      className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center py-4">Veri yok</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialList;
