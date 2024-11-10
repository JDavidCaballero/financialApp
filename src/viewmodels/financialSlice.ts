import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FinancialState } from "../models/FinancialState";
import { Transaction } from "../models/Transaction";

// Create a slice for financial state
export const financialSlice = createSlice({
    name: "financial",
    initialState: {
      transactions: [],
      monthlyIncome: 0,
      remainingBudget: 0,
    } as FinancialState,
    reducers: {
      addTransaction: (state, action: PayloadAction<Transaction>) => {
        state.transactions.push(action.payload);
        state.remainingBudget -= action.payload.amount;
      },
      setMonthlyIncome: (state, action: PayloadAction<number>) => {
        state.monthlyIncome = action.payload;
        state.remainingBudget = action.payload;
      },
    },
  });