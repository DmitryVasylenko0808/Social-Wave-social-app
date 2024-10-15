import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article, GetArticlesDto } from "./dto/get.articles.dto";
import { store } from "../../redux/store";
import { apiUrl } from "../constants";
import { updateFeed } from "./utils";

type GetUserFeedParams = {
  userId: string;
  page: number;
  sortDate: "asc" | "desc";
};

type GetFollowingFeedParams = {
  userId: string;
  page: number;
};

type CreateArticleParams = {
  text: string;
  images?: FileList;
};

type EditArticleParams = {
  id: string;
  text: string;
  images?: FileList;
};

type ToggleLikeArticleParams = {
  id: string;
  isLiked: boolean;
};

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    getFeed: builder.query<GetArticlesDto, number>({
      query: (page) => `/feed?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0,
    }),
    getUserFeed: builder.query<GetArticlesDto, GetUserFeedParams>({
      query: ({ userId, page, sortDate = "desc" }) =>
        `/feed/${userId}?page=${page}&sort_date=${sortDate}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (currentCache.data[0]?.author._id !== arg.userId) {
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
    getFollowingFeed: builder.query<GetArticlesDto, GetFollowingFeedParams>({
      query: ({ userId, page }) => `/feed/${userId}/following?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        // if (currentCache.data[0]?.author._id !== arg.userId) {
        //   return newItems;
        // } else {
        //   currentCache.data.push(...newItems.data);
        // }
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0,
    }),
    getOneArticle: builder.query<Article, string>({
      query: (id) => `/articles/${id}`,
      providesTags: (result, error, arg, meta) => {
        return [{ type: "Articles", id: arg }];
      },
    }),
    createArticle: builder.mutation<Article, CreateArticleParams>({
      query: ({ images, ...body }) => {
        const formData = new FormData();

        Object.entries(body).forEach(([key, value]) =>
          formData.append(key, value)
        );

        if (images) {
          for (let img of images) {
            formData.append("images", img);
          }
        }

        return {
          url: `/articles`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          const patchResults = updateFeed(dispatch, (draft) => {
            draft.data.unshift(data);
          });
        } catch {}
      },
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          const patchResults = updateFeed(dispatch, (draft) => {
            const article = draft.data.find((item) => item._id === id);
            const indexArticle = draft.data.findIndex(
              (item) => item._id === article?._id
            );
            const indexReposted = draft.data.findIndex(
              (item) => item.repostedArticle?._id === article?._id
            );

            draft.data.splice(indexArticle, 1).splice(indexReposted, 1);

            for (const item of draft.data) {
              if (item._id === article?.repostedArticle?._id) {
                item.reposts = item.reposts.filter(
                  (userId) => userId !== store.getState().auth.userId
                );
              }
            }
          });
        } catch {}
      },
      invalidatesTags: (result, error, arg, meta) => [
        { type: "Articles", id: arg },
      ],
    }),
    editArticle: builder.mutation<Article, EditArticleParams>({
      query: ({ id, images, ...body }) => {
        const formData = new FormData();

        Object.entries(body).forEach(([key, value]) =>
          formData.append(key, value)
        );

        if (images) {
          for (let img of images) {
            formData.append("images", img);
          }
        }

        return {
          url: `/articles/${id}`,
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          const patchResults = updateFeed(dispatch, (draft) => {
            for (let i = 0; i < draft.data.length; i++) {
              if (draft.data[i]._id === id) {
                draft.data[i] = { ...draft.data[i], ...data };
              }
            }
          });
        } catch {}
      },
      invalidatesTags: (result, error, arg, meta) => [
        { type: "Articles", id: arg.id },
      ],
    }),
    toggleLikeArticle: builder.mutation<void, ToggleLikeArticleParams>({
      query: ({ id, isLiked }) => ({
        url: `/articles/${id}/like`,
        method: !isLiked ? "POST" : "DELETE",
      }),
      onQueryStarted: async ({ id, isLiked }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          if (!isLiked) {
            const patchResults = updateFeed(dispatch, (draft) => {
              for (const item of draft.data) {
                if (item._id === id) {
                  item.likes = [
                    ...item.likes,
                    store.getState().auth.userId as string,
                  ];
                }

                if (item.repostedArticle?._id === id) {
                  item.repostedArticle.likes = [
                    ...item.repostedArticle.likes,
                    store.getState().auth.userId as string,
                  ];
                }
              }
            });
          } else {
            const patchResults = updateFeed(dispatch, (draft) => {
              for (const item of draft.data) {
                if (item._id === id) {
                  item.likes = item.likes.filter(
                    (likeItem) => likeItem !== store.getState().auth.userId
                  );
                }

                if (item.repostedArticle?._id === id) {
                  item.repostedArticle.likes =
                    item.repostedArticle.likes.filter(
                      (likeItem) => likeItem !== store.getState().auth.userId
                    );
                }
              }
            });
          }
        } catch {}
      },
      invalidatesTags: (result, error, arg, meta) => [
        { type: "Articles", id: arg.id },
      ],
    }),
    repostArticle: builder.mutation<Article, string>({
      query: (id) => ({
        url: `/articles/${id}/repost`,
        method: "POST",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          const patchResults = updateFeed(dispatch, (draft) => {
            for (const item of draft.data) {
              if (item._id === id) {
                item.reposts = [
                  ...item.reposts,
                  store.getState().auth.userId as string,
                ];
              }
            }
          });
        } catch {}
      },
      invalidatesTags: (result, error, arg, meta) => [
        { type: "Articles", id: arg },
      ],
    }),
  }),
});

export const {
  useGetFeedQuery,
  useGetUserFeedQuery,
  useGetFollowingFeedQuery,
  useGetOneArticleQuery,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useToggleLikeArticleMutation,
  useRepostArticleMutation,

  useLazyGetUserFeedQuery,
} = articlesApi;
