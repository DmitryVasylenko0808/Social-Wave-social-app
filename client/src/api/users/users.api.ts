import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetOneUserDto } from "./dto/get.one.user.dto";
import { GetUsersDto } from "./dto/get.users.dto";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4444/api/users",
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
    useGetUserFollowersQuery,
    useGetUserFollowingsQuery,
    useFollowUserMutation,
    useUnfollowUserMutation
} = usersApi;