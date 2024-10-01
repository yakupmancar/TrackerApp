import Dashboard from "./dashboard";
import { FinancialRecordsProvider } from "./context/financialRecordsContext";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <FinancialRecordsProvider>
        <Dashboard />
      </FinancialRecordsProvider>
    </div>
  );
}

export default App;
