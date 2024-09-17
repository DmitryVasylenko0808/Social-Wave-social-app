import { useParams } from "react-router";
import {
  useGetUserFeedQuery,
  useLazyGetUserFeedQuery,
} from "../api/articles/articles.api";
import { ArticleItem, InfiniteScroll } from "../common/components";
import { usePage } from "../hooks/usePage";
import { useEffect } from "react";

const UserFeed = () => {
  const { page, setPage, nextPage } = usePage();
  const { userId } = useParams();
  const [triggerGetUserFeed, { data, isFetching, isError }] =
    useLazyGetUserFeedQuery();

  useEffect(() => {
    setPage(1);
    triggerGetUserFeed({ userId: userId as string, page: 1 });
  }, [userId]);

  useEffect(() => {
    if (page !== 1) {
      triggerGetUserFeed({ userId: userId as string, page });
    }
  }, [page]);

  if (isError) {
    return <span>Error.</span>;
  }

  return (
    <div className="px-6 py-2">
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

export default UserFeed;
