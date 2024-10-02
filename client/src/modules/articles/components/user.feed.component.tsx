import { useEffect } from "react";
import { useParams } from "react-router";
import { useLazyGetUserFeedQuery } from "../../../api/articles/articles.api";
import { usePage } from "../../../hooks/usePage";
import { useAlerts } from "../../../hooks/useAlerts";
import { useTranslation } from "react-i18next";
import { InfiniteScroll, NoData } from "../../common/components";
import { List, ListItem } from "../../common/ui";
import { ArticleItem } from ".";

const UserFeed = () => {
  const alerts = useAlerts();
  const { t } = useTranslation();
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
      alerts.error(t("error"));
    }
  }, [isError]);

  if (data?.data.length === 0) {
    return <NoData message={t("noData.articles")} />;
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
