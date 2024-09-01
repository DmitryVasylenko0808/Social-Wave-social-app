import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetArticlesDto } from "./dto/get.articles.dto";
import { store } from "../../redux/store";

export const articlesApi = createApi({
    reducerPath: "articlesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4444/api",
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
        // Always merge incoming data to the cache entry
        merge: (currentCache, newItems) => {
          currentCache.data.push(...newItems.data)
        },
        // Refetch when the page arg changes
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg
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
            })
          )

          queryFulfilled.catch(result.undo);
        },
      })  
    }
)});

export const { 
    useGetFeedQuery,
    useLazyGetFeedQuery,
    useLikeArticleMutation
} = articlesApi;