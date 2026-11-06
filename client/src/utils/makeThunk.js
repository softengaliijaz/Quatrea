import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorMessage } from "../api/axios";

// Creates an async thunk whose rejection payload is a readable error message.
export const makeThunk = (type, fn) =>
  createAsyncThunk(type, async (arg, { rejectWithValue, getState }) => {
    try {
      return await fn(arg, getState);
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  });

export const money = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n || 0);
export const dateFmt = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
