import { useSelector } from "react-redux";
import { FinancialState } from "../models/FinancialState";

// TransactionList component
export const TransactionList: React.FC = () => {
  const transactions = useSelector(
    (state: { financial: FinancialState }) => state.financial.transactions
  );

  const { monthlyIncome } = useSelector(
    (state: { financial: FinancialState }) => state.financial
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Comida":
      case "Facturas":
        return "bg-green-100 border-green-200";
      case "Ocio":
        return "bg-red-100 border-red-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  // Formatear los montos en COP
  const formatCOP = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(amount);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Lista de transacciones</h2>
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`p-3 rounded-md border ${getCategoryColor(
              transaction.category
            )}`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{transaction.description}</span>
              <span
                className={`${
                  transaction.amount > monthlyIncome
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {formatCOP(transaction.amount)}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {transaction.date} - {transaction.category}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
