import { store } from "../../redux/store";
import { articlesApi } from "./articles.api";
import { Comment, GetCommentsDto } from "./dto/get.comments.dto";
import { updateFeed } from "./utils";

type GetCommentsParams = {
  articleId: string;
  page: number;
};

type CreateCommentParams = {
  articleid: string;
  text: string;
};

const commentsApi = articlesApi.injectEndpoints({
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
      query: ({ articleid, ...body }) => ({
        url: `/articles/${articleid}/comments`,
        method: "DELETE",
        body,
      }),
      onQueryStarted: async ({ articleid }, { dispatch, queryFulfilled }) => {
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

          updateFeed(dispatch, (draft) => {
            draft.data = draft.data.map((item) =>
              item._id === articleid
                ? { ...item, commentsCount: item.commentsCount + 1 }
                : item
            );
          });
        } catch {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetCommentsQuery, useCreateArticleMutation } = commentsApi;
