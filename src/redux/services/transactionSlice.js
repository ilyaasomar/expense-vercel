import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// get all transections based login user
export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTransactions();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// create transaction function
export const createTransaction = createAsyncThunk(
  "transaction/transaction",
  async ({ transaction, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createTransaction(transaction);
      toast.success("Transaction Created Successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      navigate("/transactions");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// get all transections based login user
export const getTransaction = createAsyncThunk(
  "transaction/getTransaction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTransaction(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update transaction
export const updateTransaction = createAsyncThunk(
  "transaction/updateTransaction",
  async ({ id, transaction_data, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = api.updateTransaction(id, transaction_data);
      toast.success("Transaction Updated Successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      navigate("/transactions");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete transections based login user
export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTransaction(id);
      toast.success("Transaction Deleted Successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// reducer
const transectionSlice = createSlice({
  name: "transsection",
  initialState: {
    transactions: [],
    statementTransactions: [],
    transaction: null,
    loading: false,
    error: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    allTransactionStatement: (state, action) => {
      let transType = action.payload.transaction_type;
      let startDate = action.payload.start_date;
      let endDate = action.payload.end_date;
      // state.statementTransactions = action.payload.transaction_type;
      state.statementTransactions = state.transactions.find((trans) =>
        trans.registred_date >= startDate ? action.payload : ""
      );
      // state.statementTransactions = state.transactions.find(
      //   (trans) =>
      //     trans.registred_date >= startDate &&
      //     trans.registred_date <= endDate &&
      //     trans.transaction_type === "deposit",
      //   "withdraw"
      // );
    },
  },
  extraReducers: {
    [getTransactions.pending]: (state, action) => {
      state.loading = true;
    },
    [getTransactions.fulfilled]: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    [getTransactions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || action.payload.error;
    },
    [createTransaction.pending]: (state, action) => {
      state.loading = true;
    },
    [createTransaction.fulfilled]: (state, action) => {
      state.loading = false;
      state.transactions = [action.payload];
    },
    [createTransaction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || action.payload.error;
    },
    [getTransaction.pending]: (state, action) => {
      state.loading = true;
    },
    [getTransaction.fulfilled]: (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
    },
    [getTransaction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || action.payload.error;
    },
    [updateTransaction.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTransaction.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id, transaction_data },
      } = action.meta;
      if (id) {
        state.transactions = state.transactions.map((item) =>
          item._id === id ? transaction_data : item
        );
      }
    },
    [updateTransaction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || action.payload.error;
    },
    [deleteTransaction.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTransaction.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.transactions = state.transactions.filter((row) => row._id !== id);
      }
    },
    [deleteTransaction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload || action.payload.error;
    },
  },
});
export const { clearError, allTransactionStatement } = transectionSlice.actions;
export default transectionSlice.reducer;
