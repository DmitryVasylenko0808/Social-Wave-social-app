import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export type AlertItem = {
  id: string;
  type: "info" | "success" | "error";
  message: string;
};
type AlertsState = AlertItem[];

const initialState: AlertsState = [];

export const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Omit<AlertItem, "id">>) => {
      state.push({ ...action.payload, id: v4() });
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.splice(
        state.findIndex((item) => item.id === action.payload),
        1
      );
    },
    removeAll: (state) => {
      state = [];
    },
  },
});

export const { setAlert, removeAlert, removeAll } = alertsSlice.actions;
export default alertsSlice.reducer;
