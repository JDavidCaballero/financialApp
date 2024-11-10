// Define the transaction type
export interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: string;
    category: "Comida" | "Facturas" | "Ocio" | "Otros";
  }