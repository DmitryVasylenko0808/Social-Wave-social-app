import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetOneUserDto } from "./dto/get.one.user.dto";
import { GetUsersDto } from "./dto/get.users.dto";
import { apiUrl } from "../constants";

type EditUserParams = {
    _id: string;
    firstName: string;
    secondName: string;
    email: string;
    bio?: string;
    avatar?: File;
    coverImage?: File;
}

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}/users`,
        prepareHeaders: headers => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    tagTypes: ["Users"],
    endpoints: builder => ({
       getOneUser: builder.query<GetOneUserDto, string>({
        query: id => `/${id}`,
        providesTags: ["Users"]
       }),
       editUser: builder.mutation<void, EditUserParams>({
        query: ({ _id, ...body }) => {
            const formData = new FormData();
            Object.entries(body).forEach(([key, value]) => formData.append(key, value))

            return {
                url: `/${_id}`,
                method: "PATCH",
                body: formData,
                formData: true
            }
        },
        invalidatesTags: ["Users"]
       }),
       getUserFollowers: builder.query<GetUsersDto, { id: string, page: number }>({
        query: ({ id, page }) => `/${id}/followers?page=${page}`,
        serializeQueryArgs: ({ endpointName }) => {
            return endpointName
        },
        merge: (currentCache, newItems) => {
            currentCache.data.push(...newItems.data)
        },
        forceRefetch({ currentArg, previousArg }) {
            return currentArg !== previousArg
        },
        keepUnusedDataFor: 0,
        providesTags: ["Users"]
       }),
       getUserFollowings: builder.query<GetUsersDto, { id: string, page: number }>({
        query: ({ id, page }) => `/${id}/followings?page=${page}`,
        serializeQueryArgs: ({ endpointName }) => {
            return endpointName
        },
        merge: (currentCache, newItems) => {
            currentCache.data.push(...newItems.data)
        },
        forceRefetch({ currentArg, previousArg }) {
            return currentArg !== previousArg
        },
        keepUnusedDataFor: 0,
        providesTags: ["Users"]
       }),
       followUser: builder.mutation<void, string>({
        query: id => ({
            url: `/${id}/follow`,
            method: "POST"
        }),
        invalidatesTags: ["Users"]
       }),
       unfollowUser: builder.mutation<void, string>({
        query: id => ({
            url: `/${id}/unfollow`,
            method: "DELETE"
        }),
        invalidatesTags: ["Users"]
       })
    })
});

export const {
    useGetOneUserQuery,
    useEditUserMutation,
    useGetUserFollowersQuery,
    useGetUserFollowingsQuery,
    useFollowUserMutation,
    useUnfollowUserMutation
} = usersApi;