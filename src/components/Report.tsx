import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FinancialState } from "../models/FinancialState";

// Report component
export const Report: React.FC = () => {
  const { transactions, monthlyIncome, remainingBudget } = useSelector(
    (state: { financial: FinancialState }) => state.financial
  );
  const totalSpent = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const leisureSpending = transactions
    .filter((t) => t.category === "Ocio")
    .reduce((sum, t) => sum + t.amount, 0);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSpending, setShowAlertSpending] = useState(false);

  useEffect(() => {
    if (leisureSpending > monthlyIncome * 0.3) {
      setShowAlert(true);
    }
  }, [leisureSpending, monthlyIncome]);

  useEffect(() => {
    if (totalSpent > monthlyIncome * 0.3) {
      setShowAlertSpending(true);
    }
  }, [totalSpent, monthlyIncome]);

  // Formatear valores en COP
  const formatCOP = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(amount);
  };

  const downloadReportTxt = () => {
    const reportContent = `
      Ingreso Mensual: ${formatCOP(monthlyIncome)}
      Presupuesto Restante: ${formatCOP(remainingBudget)}
      Total Gastado: ${formatCOP(totalSpent)}
      Gastado en Ocio: ${formatCOP(leisureSpending)}
  
      Desglose de Gastos:
      ------------------------
      ${transactions
        .map(
          (transaction) =>
            `${transaction.description}: ${formatCOP(transaction.amount)}`
        )
        .join("\n")}
    `;
    const blob = new Blob([reportContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reporte.txt";
    link.click();
  };

  const downloadReportCsv = () => {
    const csvContent = [
      ["Ingreso Mensual", formatCOP(monthlyIncome)],
      ["Presupuesto Restante", formatCOP(remainingBudget)],
      ["Total Gastado", formatCOP(totalSpent)],
      ["Gastado en Ocio", formatCOP(leisureSpending)],
      ["", ""],

      ["Desglose de Gastos", ""], // Título del desglose
      ["Descripción", "Cantidad"], // Encabezados
    ]
      .concat(
        transactions.map((transaction) => [
          transaction.description,
          formatCOP(transaction.amount),
        ])
      )
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "reporte.csv";
    link.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reporte</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600">Ingreso Mensual</p>
          <p className="font-bold">{formatCOP(monthlyIncome)}</p>
        </div>
        <div>
          <p className="text-gray-600">Presupuesto restante</p>
          <p
            className={`font-bold ${
              remainingBudget < monthlyIncome ? "text-red-600" : "text-gray-600"
            }`}
          >
            {formatCOP(remainingBudget)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Gastado en Ocio</p>
          <p
            className={`font-bold ${
              leisureSpending > monthlyIncome ? "text-red-600" : "text-gray-600"
            }`}
          >
            {formatCOP(leisureSpending)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Total Gastado</p>
          <p
            className={`text-xl font-bold ${
              totalSpent > monthlyIncome ? "text-red-600" : "text-gray-600"
            }`}
          >
            {formatCOP(totalSpent)}
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={downloadReportTxt} // Para archivo TXT
          className="mt-4 mr-5 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
        >
          Descargar Reporte (TXT)
        </button>

        <button
          onClick={downloadReportCsv} // Para archivo CSV
          className="mt-4 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
        >
          Descargar Reporte (CSV)
        </button>
      </div>

      {/* Mostrar alertas */}
      {showAlert && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Alerta!</strong>
          <span className="block sm:inline">
            Estás gastando más del 30% de tu ingreso en ocio. Analiza si estos
            gastos son necesarios.
          </span>
        </div>
      )}
      {showAlertSpending && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Alerta!</strong>
          <span className="block sm:inline">
            Has gastado más de lo que te puedes permitir mensualmente. Es
            urgente recortar gastos.
          </span>
        </div>
      )}

      {/* Mostrar sugerencias de recorte de gasto */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">
          Sugerencias de recorte de gastos
        </h3>
        <ul className="list-disc pl-5 mt-4">
          {transactions
            .map((transaction) => (
              <li key={transaction.id}>
                <strong>{transaction.description}</strong>:{" "}
                {formatCOP(transaction.amount)}{" "}
                {transaction.amount > monthlyIncome * 0.1 && (
                  <span className="text-red-600">
                    {" "}
                    - ¡Considera recortar este gasto!
                  </span>
                )}
              </li>
            ))
            .reverse()}
        </ul>
      </div>
    </div>
  );
};
