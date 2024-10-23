import { SignUpDto } from "./dto/sign.up.dto";
import { api } from "../../../core/api";

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  avatar?: File;
};

type VerifyEmailParams = {
  userId: string;
  code: string;
};

type ForgotPasswordParams = {
  email: string;
};

type ResetPasswordParams = {
  token: string;
  newPassword: string;
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string }, SignInParams>({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
    }),
    signUp: builder.mutation<SignUpDto, SignUpParams>({
      query: (body) => {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) =>
          formData.append(key, value)
        );

        return {
          url: "/auth/sign-up",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
    verifyEmail: builder.mutation<{ token: string }, VerifyEmailParams>({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation<void, ForgotPasswordParams>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordParams>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.query<{ userId: string }, void>({
      query: () => "/auth/me",
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLazyGetMeQuery,
} = authApi;
