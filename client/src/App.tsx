import { useAuth } from "./hooks/useAuth.ts";
import { useTheme } from "./hooks/useTheme.ts";
import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router";
import { RequireAuth, ScrollToTop } from "./modules/common/components/index.ts";
import BaseLayout from "./layouts/base.layout";
import AuthLayout from "./layouts/auth.layout";
import ErrorPage from "./pages/error.page.tsx";
import AlertsContainer from "./modules/common/components/alerts.container.component.tsx";

const HomePage = lazy(() => import("./pages/home.page"));
const BookmarksPage = lazy(() => import("./pages/bookmarks.page.tsx"));
const ProfilePage = lazy(() => import("./pages/profile.page.tsx"));
const FollowersPage = lazy(() => import("./pages/followers.page.tsx"));
const FollowingsPage = lazy(() => import("./pages/followings.page.tsx"));
const EditProfilePage = lazy(() => import("./pages/edit.profile.page.tsx"));
const OneArticlePage = lazy(() => import("./pages/one.article.page.tsx"));
const SettingsPage = lazy(() => import("./pages/settings.page.tsx"));
const SignInPage = lazy(() => import("./pages/sign.in.page.tsx"));
const SignUpPage = lazy(() => import("./pages/sign.up.page.tsx"));
const VerificationEmailPage = lazy(
  () => import("./pages/verification.email.page.tsx")
);
const ForgotPasswordPage = lazy(
  () => import("./pages/forgot.password.page.tsx")
);
const ResetPasswordPage = lazy(() => import("./pages/reset.password.page.tsx"));

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
            <Route path="verify-email" element={<VerificationEmailPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
      <AlertsContainer />
    </>
  );
}

export default App;
