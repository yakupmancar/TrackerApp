import { useUser } from "@clerk/clerk-react";
import FinancialForm from "./financialForm";
import FinancialList from "./financialList";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div>
      <h1 className="font-bold text-3xl flex justify-center">
        {
          user ? (
            "Welcome " + user?.firstName + ", Here Are Your Finances"
          ) : (
            "Welcome. Please log in to see your financial records."
          )
        }

      </h1>

      <FinancialForm />
      <FinancialList />
    </div>
  );
};

export default Dashboard;
