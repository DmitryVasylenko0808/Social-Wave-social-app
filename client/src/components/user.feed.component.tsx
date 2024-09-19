import { useParams } from "react-router";
import {
  useGetUserFeedQuery,
  useLazyGetUserFeedQuery,
} from "../api/articles/articles.api";
import { ArticleItem, InfiniteScroll, NoData } from "../common/components";
import { usePage } from "../hooks/usePage";
import { useEffect } from "react";
import { List, ListItem } from "../common/ui";
import { useAlerts } from "../hooks/useAlerts";

const UserFeed = () => {
  const alerts = useAlerts();
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

  useEffect(() => {
    if (isError) {
      alerts.error("Oops... something went wrong");
    }
  }, [isError]);

  if (data?.data.length === 0) {
    return <NoData message="No articles" />;
  }

  return (
    <div className="px-6 py-2">
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

export default UserFeed;
