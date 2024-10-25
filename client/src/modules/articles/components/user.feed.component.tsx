import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLazyGetUserFeedQuery } from "../api/articles.api";
import { usePage } from "../../common/hooks/usePage";
import { useAlerts } from "../../common/hooks/useAlerts";
import { useTranslation } from "react-i18next";
import { InfiniteScroll, NoData } from "../../common/components";
import { List, ListItem, MenuItem } from "../../common/ui";
import { ArticleItem, MenuSortArticles } from ".";

const UserFeed = () => {
  const alerts = useAlerts();
  const { t } = useTranslation();
  const { userId } = useParams();
  const { page, setPage, nextPage } = usePage();
  const [sortDate, setSortDate] = useState<"asc" | "desc">("desc");
  const [triggerGetUserFeed, { data, isFetching, isError }] =
    useLazyGetUserFeedQuery();

  useEffect(() => {
    setPage(1);
    triggerGetUserFeed({ userId: userId as string, page: 1, sortDate });
  }, [userId, sortDate]);

  useEffect(() => {
    if (page !== 1) {
      triggerGetUserFeed({ userId: userId as string, page, sortDate });
    }
  }, [page]);

  useEffect(() => {
    if (isError) {
      alerts.error(t("error"));
    }
  }, [isError]);

  const handleClickSort = (value: "asc" | "desc") => {
    setSortDate(value);
  };

  if (data?.data.length === 0) {
    return <NoData message={t("noData.articles")} />;
  }

  return (
    <div className="px-6 py-2">
      <div className="flex justify-end">
        <MenuSortArticles value={sortDate}>
          <MenuItem onClick={() => handleClickSort("desc")}>
            {t("sortMenuFeed.items.newest")}
          </MenuItem>
          <MenuItem onClick={() => handleClickSort("asc")}>
            {t("sortMenuFeed.items.oldest")}
          </MenuItem>
        </MenuSortArticles>
      </div>
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
