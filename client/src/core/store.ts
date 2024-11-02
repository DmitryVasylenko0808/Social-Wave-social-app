import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./api";
import authSlice from "../modules/auth/store/auth.slice";
import alertsSlice from "../modules/common/store/alerts.slice";
import themeSlice from "../modules/common/store/theme.slice";
import { messagesApi } from "../modules/messages/api/messages.api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    auth: authSlice,
    alerts: alertsSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddeware) =>
    getDefaultMiddeware().concat(api.middleware).concat(messagesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
