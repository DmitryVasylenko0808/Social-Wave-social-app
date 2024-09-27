import { ArticleItem } from "../common/components";
import { useGetFeedQuery } from "../api/articles/articles.api";
import { InfiniteScroll } from "../common/components";
import { usePage } from "../hooks/usePage";
import { List, ListItem } from "../common/ui";
import { useEffect } from "react";
import { useAlerts } from "../hooks/useAlerts";
import { useTranslation } from "react-i18next";

const Feed = () => {
  const alerts = useAlerts();
  const { t } = useTranslation();
  const { page, nextPage } = usePage();
  const { data: articles, isFetching, isError } = useGetFeedQuery(page);

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

export default Feed;
