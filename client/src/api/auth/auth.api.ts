import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants";
import { SignUpDto } from "./dto/sign.up.dto";

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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/auth`,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string }, SignInParams>({
      query: (body) => ({
        url: "/sign-in",
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
          url: "/sign-up",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
    verifyEmail: builder.mutation<{ token: string }, VerifyEmailParams>({
      query: (body) => ({
        url: "/verify-email",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation<void, ForgotPasswordParams>({
      query: (body) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.query<{ userId: string }, void>({
      query: () => "/me",
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useLazyGetMeQuery,
} = authApi;
