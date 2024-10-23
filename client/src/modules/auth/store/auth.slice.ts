import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    userId: string | null;
};

const initialState: AuthState = {
    userId: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string | null>) => {
            state.userId = action.payload
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;