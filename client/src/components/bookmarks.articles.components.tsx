import {
  InfiniteScroll,
  ArticleItem,
  NavigateBack,
} from "../common/components";
import { List, ListItem } from "../common/ui";
import { useGetBookmarkedArticlesQuery } from "../api/articles/bookmarked.article.api";
import { useAuth } from "../hooks/useAuth";
import { usePage } from "../hooks/usePage";

const BookmarksArticles = () => {
  const { page, nextPage } = usePage();
  const { user } = useAuth();
  const { data, isFetching, isError } = useGetBookmarkedArticlesQuery({
    userId: user.userId as string,
    page,
  });

  if (isError) {
    return <span>Error.</span>;
  }

  return (
    <div className="px-6 py-2">
      <NavigateBack />
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
  );
};

export default BookmarksArticles;
