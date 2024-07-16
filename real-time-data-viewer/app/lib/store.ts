import { configureStore } from "@reduxjs/toolkit";
import priceReducer from "./slices/priceSlice";

export const store = configureStore({
  reducer: {
    prices: priceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
