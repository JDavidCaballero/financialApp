import { configureStore } from "@reduxjs/toolkit";
import { financialSlice } from "../viewmodels/financialSlice";

// Create the Redux store
export const store = configureStore({
    reducer: {
      financial: financialSlice.reducer,
    },
  });