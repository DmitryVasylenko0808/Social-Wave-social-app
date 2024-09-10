import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { GetArticlesDto } from "./dto/get.articles.dto";
import { articlesApi } from "./articles.api";

export const updateFeed = async (
    dispatch: ThunkDispatch<any, any, UnknownAction>, 
    cb: (draft: GetArticlesDto) => void,
    id?: string
) => {
    const endpoints = ["getFeed", "getUserFeed"] as const;
    const patchResults = endpoints.map((ep) => {
        return dispatch(articlesApi.util.updateQueryData(ep, id, cb));
    });

    return patchResults;
} 