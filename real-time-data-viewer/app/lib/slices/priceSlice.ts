import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Action, UnknownAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

interface PriceState {
  data: any[];
  stock: string;
  status: "idle" | "loading" | "failed";
}

const initialState: PriceState = {
  data: [],
  stock: "BTC",
  status: "idle",
};

export const fetchPrices = createAsyncThunk(
  "prices/fetchPrices",
  async (stock: string) => {
    const response = await axios.get(`/api/fetchData/${stock}`);
    return response.data;
  }
);

const priceSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    setStock(state, action) {
      state.stock = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchPrices.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setStock } = priceSlice.actions;
export default priceSlice.reducer;
