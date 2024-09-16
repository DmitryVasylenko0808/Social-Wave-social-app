import {
  InfiniteScroll,
  ArticleItem,
  NavigateBack,
} from "../common/components";
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
        <div className="flex flex-col gap-14">
          {data?.data.map((article) => (
            <ArticleItem data={article} key={article._id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default BookmarksArticles;
