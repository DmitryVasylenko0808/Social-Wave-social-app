import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authApi } from "../api/auth/auth.api";
import authSlice from "./auth.slice";
import { articlesApi } from "../api/articles/articles.api";
import { usersApi } from "../api/users/users.api";
import alertsSlice from "./alerts.slice";
import themeSlice from "./theme.slice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authSlice,
    alerts: alertsSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddeware) =>
    getDefaultMiddeware()
      .concat(authApi.middleware)
      .concat(articlesApi.middleware)
      .concat(usersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
