import {
  useGetOneUserQuery,
  useLazyGetUserFollowersQuery,
} from "../api/users.api";
import { usePage } from "../../common/hooks/usePage";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDebounce } from "../../common/hooks/useDebounce";
import { InfiniteScroll, NavigateBack, NoData } from "../../common/components";
import { Navigate, useParams } from "react-router";
import { List, ListItem, Loader, TextField } from "../../common/ui";
import { UserItem } from ".";
import { Search } from "lucide-react";

const Followers = () => {
  const { t } = useTranslation();
  const { userId } = useParams();
  const { page, nextPage, setPage } = usePage();
  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search, 500);
  const { data: user } = useGetOneUserQuery(userId as string);
  const [triggerSearchFollowers, { data, isLoading, isFetching, isError }] =
    useLazyGetUserFollowersQuery();

  useEffect(() => {
    setPage(1);
    triggerSearchFollowers({
      id: userId as string,
      search: debounced,
      page: 1,
    });
  }, [debounced]);

  useEffect(() => {
    if (page !== 1) {
      triggerSearchFollowers({ id: userId as string, search: debounced, page });
    }
  }, [page]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const isShowLoader = isFetching && !isLoading;
  const isNoData = data?.data.length === 0 && !isFetching;

  if (isError) {
    return <Navigate to="*" replace />;
  }

  return (
    <>
      <NavigateBack
        title={t("followers.title", {
          firstName: user?.firstName,
          secondName: user?.secondName,
        })}
      />
      <div className="pt-6 pb-4 px-6">
        <TextField
          className="mb-4"
          placeholder={t("search")}
          leftAddon={
            isShowLoader ? (
              <Loader size="small" />
            ) : (
              <Search className="text-primary-200" />
            )
          }
          onChange={handleChange}
        />
        <div>
          {isNoData && <NoData message={t("noData.followers")} />}
          <InfiniteScroll
            currentPage={page}
            totalPages={data?.totalPages || 0}
            isFetching={isFetching}
            next={nextPage}
          >
            <List className="gap-4">
              {data?.data.map((user) => (
                <ListItem key={user._id}>
                  <UserItem data={user} />
                </ListItem>
              ))}
            </List>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Followers;
