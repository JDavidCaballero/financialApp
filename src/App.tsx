import React from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import { MonthlyIncomeForm } from "./components/MonthlyIncomeForm";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { Report } from "./components/Report";
import { FinancialState } from "./models/FinancialState";

const App: React.FC = () => {
  const { monthlyIncome } = useSelector(
    (state: { financial: FinancialState }) => state.financial
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Aplicación de finanzas personales
            </h1>
            {monthlyIncome === 0 ? (
              <MonthlyIncomeForm />
            ) : (
              <>
                <TransactionForm />
                <TransactionList />
                <Report />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Envolver la aplicación en el Provider para proporcionar el store de Redux
const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
