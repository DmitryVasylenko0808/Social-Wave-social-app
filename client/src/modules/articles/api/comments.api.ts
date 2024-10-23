import { api } from "../../../core/api";
import { articlesApi } from "./articles.api";
import { Comment, GetCommentsDto } from "./dto/get.comments.dto";

type GetCommentsParams = {
  articleId: string;
  page: number;
};

type CreateCommentParams = {
  articleId: string;
  text: string;
};

type DeleteCommentParams = {
  articleId: string;
  commentId: string;
};

type EditCommentParams = {
  articleId: string;
  commentId: string;
  text: string;
};

const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<GetCommentsDto, GetCommentsParams>({
      query: ({ articleId, page }) =>
        `/articles/${articleId}/comments?page=${page}`,
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
    createComment: builder.mutation<Comment, CreateCommentParams>({
      query: ({ articleId, ...body }) => ({
        url: `/articles/${articleId}/comments`,
        method: "POST",
        body,
      }),
      onQueryStarted: async ({ articleId }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            commentsApi.util.updateQueryData(
              "getComments",
              undefined,
              (draft) => {
                draft.data.unshift(data);
              }
            )
          );

          dispatch(
            articlesApi.util.updateQueryData(
              "getOneArticle",
              articleId,
              (draft) => {
                draft.commentsCount++;
              }
            )
          );
        } catch {}
      },
    }),
    deleteComment: builder.mutation<void, DeleteCommentParams>({
      query: ({ articleId, commentId }) => ({
        url: `/articles/${articleId}/comments/${commentId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { articleId, commentId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;

          dispatch(
            commentsApi.util.updateQueryData(
              "getComments",
              undefined,
              (draft) => {
                draft.data = draft.data.filter(
                  (item) => item._id !== commentId
                );
              }
            )
          );

          dispatch(
            articlesApi.util.updateQueryData(
              "getOneArticle",
              articleId,
              (draft) => {
                draft.commentsCount--;
              }
            )
          );
        } catch {}
      },
    }),
    editComment: builder.mutation<void, EditCommentParams>({
      query: ({ articleId, commentId, ...body }) => ({
        url: `/articles/${articleId}/comments/${commentId}`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async (
        { commentId, text },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;

          dispatch(
            commentsApi.util.updateQueryData(
              "getComments",
              undefined,
              (draft) => {
                for (let i = 0; i < draft.data.length; i++) {
                  if (draft.data[i]._id === commentId) {
                    draft.data[i] = { ...draft.data[i], text };
                  }
                }
              }
            )
          );
        } catch {}
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} = commentsApi;
