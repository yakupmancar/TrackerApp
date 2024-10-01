import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useFinancialRecords } from "../context/financialRecordsContext";

const FinancialForm = () => {
  const { user } = useUser();
  const { addRecord } = useFinancialRecords();

  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: parseFloat(amount),
      category: category,
      paymentMethod: paymentMethod,
    };
    addRecord(newRecord);

    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto mt-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <section className="flex flex-col gap-1">
          <label htmlFor="description" className="font-semibold">
            Description:
          </label>
          <input
            className="border-2 border-gray-300 rounded-md outline-none px-2"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            required
          />
        </section>
        <section className="flex flex-col gap-1">
          <label htmlFor="amount" className="font-semibold">
            Amount:{" "}
          </label>
          <input
            className="border-2 border-gray-300 rounded-md outline-none px-2"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            required
          />
        </section>

        <section className="flex flex-col gap-1">
          <label className="font-semibold">Category:</label>
          <select
            className="outline-none border-2 border-gray-300 rounded-md "
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </section>

        <section className="flex flex-col gap-1">
          <label className="font-semibold">Payment Method:</label>
          <select
            className="outline-none border-2 border-gray-300 rounded-md "
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </section>

        <button className="bg-blue-500 hover:bg-blue-600 text-white w-28 h-9 font-semibold rounded-lg py-1">Add Record</button>
      </form>
    </div>
  );
};

export default FinancialForm;
