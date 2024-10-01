import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  //! ALL RECORD
  const fetchAllRecords = async () => {
    if (!user?.id) {
      console.error("User ID is not available");
      return;
    }

    try {
      const response = await fetch(`/api/records/${user?.id}`);

      if (response.ok) {
        const records = await response.json();
        console.log(records);
        setRecords(records);
      } else {
        console.error("Failed to fetch records:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchAllRecords();
  }, [user]);

  //! CREATE RECORD
  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch("/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! DELETE RECORD
  const deleteRecord = async (id: string) => {
    const response = await fetch(`/api/records/${id}`, {
      method: "DELETE",
    });

    try {
      if (response.ok) {
        const deleteRecord = await response.text();
        console.log(deleteRecord);
        setRecords((prev) => prev.filter((record) => record._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! UPDATE RECORD
  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    const response = await fetch(`/api/records/${id}`, {
      method: "PUT",
      body: JSON.stringify(newRecord),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, deleteRecord, updateRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used with a FinancialRecordsProvider"
    );
  }

  return context;
};
