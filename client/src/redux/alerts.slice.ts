import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertItem = {
  type: "info" | "success" | "error";
  message: string;
};
type AlertsState = AlertItem[];

const initialState: AlertsState = [];

export const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertItem>) => {
      state.push(action.payload);
    },
    removeAlert: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    removeAll: (state) => {
      state = [];
    },
  },
});

export const { setAlert, removeAlert, removeAll } = alertsSlice.actions;
export default alertsSlice.reducer;
