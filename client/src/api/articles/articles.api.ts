import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article, GetArticlesDto } from "./dto/get.articles.dto";
import { store } from "../../redux/store";
import { apiUrl } from "../constants";

type GetUserFeedParams = {
  userId: string;
  page: number;
};

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
      likeArticle: builder.mutation<void, string>({
        query: (id) => ({
          url: `/articles/${id}/like`,
          method: "POST"
        }),
        onQueryStarted: (id, { dispatch, queryFulfilled }) => {
          const result = dispatch(
            articlesApi.util.updateQueryData("getFeed", 0, (draft) => {
              draft.data = draft.data.map(item => item._id === id ? { ...item, likes: [...item.likes, store.getState().auth.userId as string] } : item)
            }),
          )

          queryFulfilled.catch(result.undo);
        },
      })  
    }
)});

export const { 
    useGetFeedQuery,
    useGetUserFeedQuery,
    useGetOneArticleQuery,
    useLikeArticleMutation
} = articlesApi;