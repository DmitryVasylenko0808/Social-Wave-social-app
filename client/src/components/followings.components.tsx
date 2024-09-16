import { InfiniteScroll, NavigateBack, UserItem } from "../common/components";
import { useParams } from "react-router";
import {
  useGetOneUserQuery,
  useGetUserFollowingsQuery,
} from "../api/users/users.api";
import { usePage } from "../hooks/usePage";

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
          <div className="flex flex-col gap-4">
            {data?.data.map((user) => (
              <UserItem data={user} key={user._id} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Followings;
