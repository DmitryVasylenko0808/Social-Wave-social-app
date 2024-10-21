import { lazy } from "react";
import { useLocation, Routes, Route } from "react-router";
import AuthLayout from "./layouts/auth.layout";
import BaseLayout from "./layouts/base.layout";
import { ArticleModal } from "./modules/articles/components";
import { ScrollToTop, RequireAuth } from "./modules/common/components";

import ErrorPage from "./pages/error.page.tsx";
import GoogleAuthRedirectPage from "./pages/google.auth.redirect.page.tsx";
const HomePage = lazy(() => import("./pages/home.page"));
const BookmarksPage = lazy(() => import("./pages/bookmarks.page.tsx"));
const ProfilePage = lazy(() => import("./pages/profile.page.tsx"));
const FollowersPage = lazy(() => import("./pages/followers.page.tsx"));
const FollowingsPage = lazy(() => import("./pages/followings.page.tsx"));
const EditProfilePage = lazy(() => import("./pages/edit.profile.page.tsx"));
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

const Navigation = () => {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <ScrollToTop>
        <Routes location={state?.backgroundLocation || location}>
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
            <Route
              path="article/:articleId"
              element={
                <>
                  <HomePage />
                  <ArticleModal />
                </>
              }
            />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="verify-email" element={<VerificationEmailPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route
              path="google-auth-redirect"
              element={<GoogleAuthRedirectPage />}
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="article/:articleId" element={<ArticleModal />} />
        </Routes>
      )}
    </>
  );
};

export default Navigation;
