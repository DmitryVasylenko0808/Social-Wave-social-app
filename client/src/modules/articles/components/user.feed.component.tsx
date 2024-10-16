import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useLazyGetUserFeedQuery } from "../../../api/articles/articles.api";
import { usePage } from "../../../hooks/usePage";
import { useAlerts } from "../../../hooks/useAlerts";
import { useTranslation } from "react-i18next";
import { InfiniteScroll, NoData } from "../../common/components";
import {
  Button,
  List,
  ListItem,
  Menu,
  MenuItem,
  Tab,
  Tabs,
} from "../../common/ui";
import { ArticleItem } from ".";
import { useClickOutside } from "../../../hooks/useClickOutside";

const UserFeed = () => {
  const alerts = useAlerts();
  const { t } = useTranslation();
  const { userId } = useParams();
  const { page, setPage, nextPage } = usePage();
  const [triggerGetUserFeed, { data, isFetching, isError }] =
    useLazyGetUserFeedQuery();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [sortDate, setSortDate] = useState<"asc" | "desc">("desc");
  const ref = useRef<HTMLDivElement>(null);
  const handleClickMenu = () => setOpenMenu(true);
  useClickOutside(ref, () => setOpenMenu(false));
  const handleClickSort = (value: "asc" | "desc") => {
    setSortDate(value);
    setOpenMenu(false);
  };

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

  if (data?.data.length === 0) {
    return <NoData message={t("noData.articles")} />;
  }

  return (
    <div className="px-6 py-2">
      <div className="flex justify-end">
        <div className="relative">
          <Button variant="terciary" onClick={handleClickMenu}>
            Sort by: {sortDate === "desc" ? "Newest" : "Oldest"}
          </Button>

          <Menu open={openMenu} ref={ref}>
            <MenuItem onClick={() => handleClickSort("desc")}>Newest</MenuItem>
            <MenuItem onClick={() => handleClickSort("asc")}>Oldest</MenuItem>
          </Menu>
        </div>
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
