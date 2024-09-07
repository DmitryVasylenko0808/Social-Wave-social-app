import { Route, Routes } from "react-router";
import BaseLayout from "./layouts/base.layout";
import HomePage from "./pages/home.page";
import AuthLayout from "./layouts/auth.layout.tsx";
import SignInPage from "./pages/sign.in.page";
import SignUpPage from "./pages/sign.up.page";
import { useAuth } from "./hooks/useAuth.ts";
import { useEffect } from "react";
import ProfilePage from "./pages/profile.page.tsx";
import FollowersPage from "./pages/followers.page.tsx";
import FollowingsPage from "./pages/followings.page.tsx";
import EditProfilePage from "./pages/edit.profile.page.tsx";
import OneArticlePage from "./pages/one.article.page.tsx";

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
        <Route path="articles/:articleId" element={<OneArticlePage />} />
        <Route path="users">
          <Route path=":userId/profile" element={<ProfilePage />} />
          <Route path=":userId/edit" element={<EditProfilePage />} />
          <Route path=":userId/followers" element={<FollowersPage />} />
          <Route path=":userId/followings" element={<FollowingsPage />} />
        </Route>
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
