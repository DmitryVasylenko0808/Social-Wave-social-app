import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetArticlesDto } from "./dto/get.articles.dto";

export const articlesApi = createApi({
    reducerPath: "articlesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4444/api",
        prepareHeaders: headers => {
            headers.set("authorization", `Bearer ${localStorage.getItem("token")}`)
        }
    }),
    endpoints: builder => ({
      getFeed: builder.query<GetArticlesDto, number>({
        query: (page) => `/feed?page=${page}`
      })  
    }
)});

export const { 
    useGetFeedQuery
} = articlesApi;