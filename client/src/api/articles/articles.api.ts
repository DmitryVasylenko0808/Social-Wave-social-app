import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article, GetArticlesDto } from "./dto/get.articles.dto";
import { store } from "../../redux/store";
import { apiUrl } from "../constants";

type GetUserFeedParams = {
  userId: string;
  page: number;
};

type CreateArticleParams = {
  text: string;
}

export const articlesApi = createApi({
    reducerPath: "articlesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}`,
        prepareHeaders: headers => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    tagTypes: ["Articles"],
    endpoints: builder => ({
      getFeed: builder.query<GetArticlesDto, number>({
        query: (page) => `/feed?page=${page}`,
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
      }),
      getUserFeed: builder.query<GetArticlesDto, GetUserFeedParams>({
        query: ({ userId, page }) => `/feed/${userId}?page=${page}`,
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName
        },
        merge: (currentCache, newItems, { arg }) => {
          currentCache.data.push(...newItems.data);
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg
        },
        keepUnusedDataFor: 0,
      }),
      getOneArticle: builder.query<Article, string>({
        query: (id) => `/articles/${id}`,
        providesTags: (result, error, arg, meta) => {
          return [{ type: "Articles", id: arg }]
        },
      }),
      createArticle: builder.mutation<Article, CreateArticleParams>({
        query: body => {
          const formData = new FormData();
          Object.entries(body).forEach(([key, value]) => formData.append(key, value))

          return {
              url: `/articles`,
              method: "POST",
              body: formData,
              formData: true
          }
        },
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled;
            
            const result = dispatch(
              articlesApi.util.updateQueryData(
                "getUserFeed", 
                { userId: store.getState().auth.userId as string, page: 1 }, 
                (draft) => {
                  draft.data.unshift(data);
                }
              )
            );
          } catch {} 
        },
        invalidatesTags: ["Articles"]
      }),
      deleteArticle: builder.mutation<void, string>({
        query: id => ({
          url: `/articles/${id}`,
          method: "DELETE"
        }),
        onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled;

            const resultFeedUser = dispatch(
              articlesApi.util.updateQueryData("getUserFeed", undefined, (draft) => {
                draft.data = draft.data.filter(item => item._id !== id);
              })
            );

            const resultFeed = dispatch(
              articlesApi.util.updateQueryData("getFeed", undefined, (draft) => {
                draft.data = draft.data.filter(item => item._id !== id);
              })
            )
          } catch {}
        }
      }),
      likeArticle: builder.mutation<void, string>({
        query: (id) => ({
          url: `/articles/${id}/like`,
          method: "POST"
        }),
        onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled;

            const result = dispatch(
              articlesApi.util.updateQueryData("getFeed", 0, (draft) => {
                draft.data = draft.data.map(item => item._id === id ? { ...item, likes: [...item.likes, store.getState().auth.userId as string] } : item)
              }),
            )

            const resultFeedUser = dispatch(
              articlesApi.util.updateQueryData("getUserFeed", undefined, (draft) => {
                draft.data = draft.data.map(item => item._id === id ? { ...item, likes: [...item.likes, store.getState().auth.userId as string] } : item)
              }),
            )
          } catch {}
        },
        invalidatesTags: (result, error, arg, meta) => [{ type: "Articles", id: arg }],
      }),
      unlikeArticle: builder.mutation<void, string>({
        query: (id) => ({
          url: `/articles/${id}/like`,
          method: "DELETE"
        }),
        onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled;

            const result = dispatch(
              articlesApi.util.updateQueryData("getFeed", 0, (draft) => {
                draft.data = draft.data.map(item => item._id === id ? { ...item, likes: item.likes.filter(likeItem => likeItem !== store.getState().auth.userId) } : item)
              }),
            )

            const resultFeedUser = dispatch(
              articlesApi.util.updateQueryData("getUserFeed", undefined, (draft) => {
                draft.data = draft.data.map(item => item._id === id ? { ...item, likes: item.likes.filter(likeItem => likeItem !== store.getState().auth.userId) } : item)
              }),
            )
          } catch {}
        },
        invalidatesTags: (result, error, arg, meta) => [{ type: "Articles", id: arg }],
      }),
      bookmarkArticle: builder.mutation<void, string>({
        query: (id) => ({
          url: `/articles/${id}/bookmark`,
          method: "POST"
        }),
        onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled;

            const result = dispatch(
              articlesApi.util.updateQueryData("getFeed", 0, (draft) => {
                draft.data = draft.data.map(item => item._id === id ? { ...item, bookmarks: [...item.bookmarks, store.getState().auth.userId as string] } : item)
              }),
            )

            const resultFeedUser = dispatch(
              articlesApi.util.updateQueryData("getUserFeed", undefined, (draft) => {
                draft.data = draft.data.map(item => item._id === id ? { ...item, bookmarks: [...item.bookmarks, store.getState().auth.userId as string] } : item)
              }),
            )
          } catch {}
        },
        invalidatesTags: (result, error, arg, meta) => [{ type: "Articles", id: arg }],
      }), 
      unbookmarkArticle: builder.mutation<void, string>({
        query: (id) => ({
          url: `/articles/${id}/bookmark`,
          method: "DELETE"
        }),
        onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled;

            const result = dispatch(
              articlesApi.util.updateQueryData("getFeed", 0, (draft) => {
                draft.data = draft.data.map(item => item._id === id ? { ...item, bookmarks: item.bookmarks.filter(likeItem => likeItem !== store.getState().auth.userId) } : item)
              }),
            )

            const resultFeedUser = dispatch(
              articlesApi.util.updateQueryData("getUserFeed", undefined, (draft) => {
                draft.data = draft.data.map(item => item._id === id ? { ...item, bookmarks: item.bookmarks.filter(likeItem => likeItem !== store.getState().auth.userId) } : item)
              }),
            )
          } catch {}
        },
        invalidatesTags: (result, error, arg, meta) => [{ type: "Articles", id: arg }],
      }), 
    }
)});

export const { 
    useGetFeedQuery,
    useGetUserFeedQuery,
    useGetOneArticleQuery,
    useCreateArticleMutation,
    useDeleteArticleMutation,
    useLikeArticleMutation,
    useUnlikeArticleMutation,
    useBookmarkArticleMutation,
    useUnbookmarkArticleMutation
} = articlesApi;