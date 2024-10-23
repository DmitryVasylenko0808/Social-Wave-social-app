import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  value: boolean;
};

const initialState: ThemeState = {
  value: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkTheme: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
