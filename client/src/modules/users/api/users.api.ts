import { GetOneUserDto } from "./dto/get.one.user.dto";
import { GetUsersDto } from "./dto/get.users.dto";
import { GetSuggestedUsersDto } from "./dto/get.suggested.users.dto";
import { api } from "../../../core/api";

type SearchUsersParams = {
  query: string;
  page: number;
};

type SearchFollowersParams = {
  id: string;
  page: number;
  search?: string;
};

type SearchFollowingsParams = SearchFollowersParams;

type EditUserParams = {
  _id: string;
  firstName: string;
  secondName: string;
  email: string;
  bio?: string;
  avatar?: File;
  coverImage?: File;
};

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOneUser: builder.query<GetOneUserDto, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),
    searchUsers: builder.query<GetUsersDto, SearchUsersParams>({
      query: ({ query, page }) =>
        `/users/search/by/name?query=${query}&page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (currentCache.searchValue !== newItems.searchValue) {
          return newItems;
        } else {
          currentCache.data.push(...newItems.data);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0,
    }),
    editUser: builder.mutation<void, EditUserParams>({
      query: ({ _id, ...body }) => {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) =>
          formData.append(key, value)
        );

        return {
          url: `/users/${_id}`,
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Users"],
    }),
    getUserFollowers: builder.query<GetUsersDto, SearchFollowersParams>({
      query: ({ id, page, search }) =>
        `/users/${id}/followers?page=${page}&search=${search}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (currentCache.searchValue !== newItems.searchValue) {
          return newItems;
        } else {
          currentCache.data.push(...newItems.data);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0,
      providesTags: ["Users"],
    }),
    getUserFollowings: builder.query<GetUsersDto, SearchFollowingsParams>({
      query: ({ id, page, search }) =>
        `/users/${id}/followings?page=${page}&search=${search}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (currentCache.searchValue !== newItems.searchValue) {
          return newItems;
        } else {
          currentCache.data.push(...newItems.data);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0,
      providesTags: ["Users"],
    }),
    getSuggestedUsers: builder.query<GetSuggestedUsersDto, string>({
      query: (id) => `/users/${id}/suggested`,
      providesTags: ["Users"],
      keepUnusedDataFor: 0,
    }),
    followUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
    unfollowUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}/unfollow`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetOneUserQuery,
  useEditUserMutation,
  useGetUserFollowersQuery,
  useGetUserFollowingsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,

  useLazySearchUsersQuery,
  useLazyGetUserFollowersQuery,
  useLazyGetUserFollowingsQuery,
  useLazyGetSuggestedUsersQuery,
} = usersApi;
