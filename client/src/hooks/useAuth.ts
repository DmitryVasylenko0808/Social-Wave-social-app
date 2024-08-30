import { useLazyGetMeQuery } from "../api/auth/auth.api";
import { setUser } from "../redux/auth.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.auth);

    const [triggerGetMe] = useLazyGetMeQuery();

    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    const setAuthData = () => {
        triggerGetMe()
            .unwrap()
            .then((data) => dispatch(setUser(data.userId)))
    }

    const authenticate = (token: string) => {
        localStorage.setItem("token", token);
        setAuthData();
    };

    const logOut = () => {
        localStorage.removeItem("token");
        dispatch(setUser(null));
    }

    return {
        user,
        token,
        isAuthenticated,
        setAuthData,
        authenticate,
        logOut
    }
};