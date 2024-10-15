import { useEffect } from "react";
import { useGetFollowingFeedQuery } from "../../../api/articles/articles.api";
import { usePage } from "../../../hooks/usePage";
import { useAlerts } from "../../../hooks/useAlerts";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { InfiniteScroll } from "../../common/components";
import { List, ListItem } from "../../common/ui";
import { ArticleItem } from ".";

const FollowingFeed = () => {
  const alerts = useAlerts();
  const { t } = useTranslation();
  const { userId } = useParams();
  const { page, nextPage } = usePage();
  const {
    data: articles,
    isFetching,
    isError,
  } = useGetFollowingFeedQuery({ userId: userId as string, page });

  useEffect(() => {
    if (isError) {
      alerts.error(t("error"));
    }
  }, [isError]);

  return (
    <div className="px-6">
      <InfiniteScroll
        next={nextPage}
        currentPage={page}
        isFetching={isFetching}
        totalPages={articles?.totalPages || 0}
      >
        <List>
          {articles?.data.map((article) => (
            <ListItem key={article._id}>
              <ArticleItem data={article} />
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default FollowingFeed;
