import { useGetBookmarkedArticlesQuery } from "../api/bookmarked.article.api";
import { useAuth } from "../../auth/hooks/useAuth";
import { usePage } from "../../common/hooks/usePage";
import { useTranslation } from "react-i18next";
import { InfiniteScroll, NavigateBack, NoData } from "../../common/components";
import { List, ListItem } from "../../common/ui";
import { Navigate } from "react-router";
import { ArticleItem } from ".";

const BookmarksArticles = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { page, nextPage } = usePage();
  const { data, isFetching, isError } = useGetBookmarkedArticlesQuery({
    userId: user.userId as string,
    page,
  });

  if (isError) {
    return <Navigate to="*" replace />;
  }

  if (data?.data.length === 0) {
    return <NoData message={t("noData.articles")} />;
  }

  return (
    <>
      <NavigateBack />
      <div className="pt-6 pb-4 px-6">
        <InfiniteScroll
          next={nextPage}
          currentPage={page}
          isFetching={isFetching}
          totalPages={data?.totalPages || 0}
        >
          <List>
            {data?.data.map((article) => (
              <ListItem key={article._id}>
                <ArticleItem data={article} />
              </ListItem>
            ))}
          </List>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default BookmarksArticles;
