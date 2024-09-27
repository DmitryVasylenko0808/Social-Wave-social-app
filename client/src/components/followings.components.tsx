import {
  InfiniteScroll,
  NavigateBack,
  NoData,
  UserItem,
} from "../common/components";
import { Navigate, useParams } from "react-router";
import { List, ListItem } from "../common/ui";
import {
  useGetOneUserQuery,
  useGetUserFollowingsQuery,
} from "../api/users/users.api";
import { usePage } from "../hooks/usePage";
import { useTranslation } from "react-i18next";

const Followings = () => {
  const { t } = useTranslation();
  const { userId } = useParams();
  const { page, nextPage } = usePage();
  const { data: user } = useGetOneUserQuery(userId as string);
  const { data, isFetching, isError } = useGetUserFollowingsQuery({
    id: userId as string,
    page,
  });

  if (isError) {
    return <Navigate to="*" replace />;
  }

  if (data?.data.length === 0) {
    return <NoData message={t("noData.followings")} />;
  }

  return (
    <div className="px-6 py-2">
      <NavigateBack
        title={t("followings.title", {
          firstName: user?.firstName,
          secondName: user?.secondName,
        })}
      />
      <div className="">
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
  );
};

export default Followings;
