import { Route, Routes } from "react-router";
import BaseLayout from "./layouts/base.layout";
import HomePage from "./pages/home.page";
import AuthLayout from "./layouts/auth.layout.tsx";
import SignInPage from "./pages/sign.in.page";
import SignUpPage from "./pages/sign.up.page";
import { useAuth } from "./hooks/useAuth.ts";
import { useEffect } from "react";
import ProfilePage from "./pages/profile.page.tsx";

function App() {
  const { isAuthenticated, setAuthData } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setAuthData();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/:userId/profile" element={<ProfilePage />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
