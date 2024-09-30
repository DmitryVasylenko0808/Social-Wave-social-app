import { useAuth } from "./hooks/useAuth.ts";
import { useTheme } from "./hooks/useTheme.ts";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { RequireAuth, ScrollToTop } from "./common/components/index.ts";
import BaseLayout from "./layouts/base.layout";
import HomePage from "./pages/home.page";
import AuthLayout from "./layouts/auth.layout.tsx";
import SignInPage from "./pages/sign.in.page";
import SignUpPage from "./pages/sign.up.page";
import ProfilePage from "./pages/profile.page.tsx";
import FollowersPage from "./pages/followers.page.tsx";
import FollowingsPage from "./pages/followings.page.tsx";
import EditProfilePage from "./pages/edit.profile.page.tsx";
import OneArticlePage from "./pages/one.article.page.tsx";
import BookmarksPage from "./pages/bookmarks.page.tsx";
import SettingsPage from "./pages/settings.page.tsx";
import ErrorPage from "./pages/error.page.tsx";
import AlertsContainer from "./components/alerts.container.component.tsx";

import "./i18n/i18n.js";

function App() {
  const { isAuthenticated, setAuthData } = useAuth();
  const { isDarkTheme, setDarkTheme } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      setAuthData();
    }
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      setDarkTheme();
    }
  }, []);

  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<HomePage />} />
            <Route element={<RequireAuth />}>
              <Route path="bookmarks" element={<BookmarksPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="users/:userId">
              <Route path="profile" element={<ProfilePage />} />
              <Route path="followers" element={<FollowersPage />} />
              <Route path="followings" element={<FollowingsPage />} />
              <Route element={<RequireAuth />}>
                <Route path="edit" element={<EditProfilePage />} />
              </Route>
            </Route>
            <Route path="articles/:articleId" element={<OneArticlePage />} />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
      <AlertsContainer />
    </>
  );
}

export default App;
