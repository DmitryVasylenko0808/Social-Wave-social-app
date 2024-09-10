import { store } from "../../redux/store";
import { articlesApi } from "./articles.api";
import { updateFeed } from "./utils";

type ToggleBookmarkArticleParams = {
  id: string;
  isBookmarked: boolean;
};

const bookmarkedArticleApi = articlesApi.injectEndpoints({
  endpoints: (builder) => ({
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
              draft.data = draft.data
                .map((item) =>
                  item._id === id
                    ? {
                        ...item,
                        bookmarks: [
                          ...item.bookmarks,
                          store.getState().auth.userId as string,
                        ],
                      }
                    : item
                )
                .map((item) =>
                  item.repostedArticle?._id === id
                    ? {
                        ...item,
                        repostedArticle: {
                          ...item.repostedArticle,
                          bookmarks: [
                            ...item.repostedArticle.bookmarks,
                            store.getState().auth.userId as string,
                          ],
                        },
                      }
                    : item
                );
            });
          } else {
            const patchResults = updateFeed(dispatch, (draft) => {
              draft.data = draft.data
                .map((item) =>
                  item._id === id
                    ? {
                        ...item,
                        bookmarks: item.bookmarks.filter(
                          (likeItem) =>
                            likeItem !== store.getState().auth.userId
                        ),
                      }
                    : item
                )
                .map((item) =>
                  item.repostedArticle?._id === id
                    ? {
                        ...item,
                        repostedArticle: {
                          ...item.repostedArticle,
                          bookmarks: item.repostedArticle.bookmarks.filter(
                            (likeItem) =>
                              likeItem !== store.getState().auth.userId
                          ),
                        },
                      }
                    : item
                );
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

export const { useToggleBookmarkArticleMutation } = bookmarkedArticleApi;
