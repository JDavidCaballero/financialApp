// MonthlyIncomeForm component

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { financialSlice } from "../viewmodels/financialSlice";
import { FinancialState } from "../models/FinancialState";

const { setMonthlyIncome } = financialSlice.actions;

export const MonthlyIncomeForm: React.FC = () => {
  const { monthlyIncome } = useSelector(
    (state: { financial: FinancialState }) => state.financial
  );

  const [income, setIncome] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setMonthlyIncome(parseFloat(income)));
    setIncome("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {monthlyIncome === 0 ? (
        <label
          htmlFor="income"
          className="block text-sm font-medium text-red-500 mb-2"
        >
          Ingresar tu nomina para comenzar a registrar transacciones
        </label>
      ) : (
        <label
          htmlFor="income"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nomina mensual
        </label>
      )}
      <div className="flex">
        <input
          id="income"
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Ingresa tu nomina mensual"
          className="flex-grow mr-2 p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          max="90000000" // Límite máximo de valor
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};
