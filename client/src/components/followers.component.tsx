import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { InfiniteScroll, UserItem } from "../common/components";
import { Button } from "../common/ui";
import { useParams, useNavigate } from "react-router";
import {
  useGetOneUserQuery,
  useGetUserFollowersQuery,
} from "../api/users/users.api";

const Followers = () => {
  const { userId } = useParams();
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const { data: user } = useGetOneUserQuery(userId as string);
  const { data, isFetching, isError } = useGetUserFollowersQuery({
    id: userId as string,
    page,
  });

  const handleClickBack = () => navigate(-1);

  const nextPage = () => setPage(page + 1);

  if (isFetching) {
    return <span>Fetching...</span>;
  }

  if (isError) {
    return <span>Error.</span>;
  }

  return (
    <div className="px-6 py-2">
      <div className="mb-10 flex items-center gap-3.5">
        <Button variant="terciary" onClick={handleClickBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl text-primary-200 font-bold">
          {user?.firstName} {user?.secondName}: Followers
        </h2>
      </div>
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

export default Followers;
