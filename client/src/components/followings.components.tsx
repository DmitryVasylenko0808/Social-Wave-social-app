import { InfiniteScroll, NavigateBack, UserItem } from "../common/components";
import { useParams } from "react-router";
import {
  useGetOneUserQuery,
  useGetUserFollowingsQuery,
} from "../api/users/users.api";
import { usePage } from "../hooks/usePage";
import { List, ListItem } from "../common/ui";

const Followings = () => {
  const { userId } = useParams();
  const { page, nextPage } = usePage();
  const { data: user } = useGetOneUserQuery(userId as string);
  const { data, isFetching, isError } = useGetUserFollowingsQuery({
    id: userId as string,
    page,
  });

  if (isError) {
    return <span>Error.</span>;
  }

  return (
    <div className="px-6 py-2">
      <NavigateBack
        title={`${user?.firstName} ${user?.secondName}: Followings`}
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
