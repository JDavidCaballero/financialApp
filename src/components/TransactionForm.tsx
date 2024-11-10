import { useState } from "react";
import { Transaction } from "../models/Transaction";
import { financialSlice } from "../viewmodels/financialSlice";
import { useDispatch, useSelector } from "react-redux";
import { FinancialState } from "../models/FinancialState";

const { addTransaction } = financialSlice.actions;

// TransactionForm component
export const TransactionForm: React.FC = () => {
  const { monthlyIncome } = useSelector(
    (state: { financial: FinancialState }) => state.financial
  );

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<
    "Comida" | "Facturas" | "Ocio" | "Otros"
  >("Otros");
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString().split("T")[0],
      category,
    };
    dispatch(addTransaction(newTransaction));
    setDescription("");
    setAmount("");
    setCategory("Otros");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Titulo del gasto
          </label>
          <input
            id="description"
            placeholder="Titulo de la transacción"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
            disabled={monthlyIncome === 0}
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cantidad
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Cantidad de la transacción"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
            disabled={monthlyIncome === 0}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Categoria
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as "Comida" | "Facturas" | "Ocio" | "Otros"
              )
            }
            className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            disabled={monthlyIncome === 0}
          >
            <option value="food">Comida</option>
            <option value="bills">Facturas</option>
            <option value="leisure">Ocio</option>
            <option value="other">Otros</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
        disabled={monthlyIncome === 0}
      >
        Añadir transacción
      </button>
    </form>
  );
};
