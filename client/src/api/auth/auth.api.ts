import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../constants";

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

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}/auth`,
        prepareHeaders: headers => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
        signIn: builder.mutation<{ token: string }, SignInParams>({
            query: body => ({
                url: "/sign-in",
                method: "POST",
                body
            })
        }),
        signUp: builder.mutation<{ token: string }, SignUpParams>({
            query: body => {
                const formData = new FormData();
                Object.entries(body).forEach(([key, value]) => formData.append(key, value))

                return {
                    url: "/sign-up",
                    method: "POST",
                    body: formData,
                    formData: true
                }
            }
        }),
        getMe: builder.query<{ userId: string }, void>({
            query: () => "/me"
        })
    }
)});

export const { 
    useSignInMutation, 
    useSignUpMutation,
    useLazyGetMeQuery 
} = authApi;