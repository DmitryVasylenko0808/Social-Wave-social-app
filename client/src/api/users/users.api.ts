import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetOneUserDto } from "./dto/get.one.user.dto";

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
    })
});

export const {
    useGetOneUserQuery
} = usersApi;