import { store } from "../../redux/store";
import { articlesApi } from "./articles.api";
import { GetArticlesDto } from "./dto/get.articles.dto";
import { updateFeed } from "./utils";

type GetBookmarkedArticleParams = {
  userId: string;
  page: number;
};

type ToggleBookmarkArticleParams = {
  id: string;
  isBookmarked: boolean;
};

const bookmarkedArticleApi = articlesApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarkedArticles: builder.query<
      GetArticlesDto,
      GetBookmarkedArticleParams
    >({
      query: ({ userId, page }) =>
        `/articles/user/${userId}/bookmarked?page=${page}`,
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
    toggleBookmarkArticle: builder.mutation<void, ToggleBookmarkArticleParams>({
      query: ({ id, isBookmarked }) => ({
        url: `/articles/${id}/bookmark`,
        method: !isBookmarked ? "POST" : "DELETE",
      }),
      onQueryStarted: async (
        { id, isBookmarked },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;

          if (!isBookmarked) {
            const patchResults = updateFeed(dispatch, (draft) => {
              for (const item of draft.data) {
                if (item._id === id) {
                  item.bookmarks = [
                    ...item.bookmarks,
                    store.getState().auth.userId as string,
                  ];
                }

                if (item.repostedArticle?._id === id) {
                  item.repostedArticle.bookmarks = [
                    ...item.repostedArticle.bookmarks,
                    store.getState().auth.userId as string,
                  ];
                }
              }
            });
          } else {
            const patchResults = updateFeed(dispatch, (draft) => {
              for (const item of draft.data) {
                if (item._id === id) {
                  item.bookmarks = item.bookmarks.filter(
                    (bmItem) => bmItem !== store.getState().auth.userId
                  );
                }

                if (item.repostedArticle?._id === id) {
                  item.repostedArticle.bookmarks =
                    item.repostedArticle.bookmarks.filter(
                      (bmItem) => bmItem !== store.getState().auth.userId
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
  }),
  overrideExisting: false,
});

export const {
  useGetBookmarkedArticlesQuery,
  useToggleBookmarkArticleMutation,
} = bookmarkedArticleApi;
