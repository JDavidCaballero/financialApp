import { Transaction } from "./Transaction";

export interface FinancialState {
    transactions: Transaction[];
    monthlyIncome: number;
    remainingBudget: number;
}