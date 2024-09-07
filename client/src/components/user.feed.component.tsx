import React, { useState } from "react";
import { useParams } from "react-router";
import { useGetUserFeedQuery } from "../api/articles/articles.api";
import { ArticleItem, InfiniteScroll } from "../common/components";

const UserFeed = () => {
  const [page, setPage] = useState<number>(1);
  const { userId } = useParams();
  const { data, isFetching, isError } = useGetUserFeedQuery({
    userId: userId as string,
    page,
  });

  const next = () => setPage(page + 1);

  if (isError) {
    return <span>Error.</span>;
  }

  return (
    <div className="px-6 py-2">
      <InfiniteScroll
        next={next}
        currentPage={page}
        isFetching={isFetching}
        totalPages={data?.totalPages || 0}
      >
        <div className="flex flex-col gap-14">
          {data?.data.map((article) => (
            <ArticleItem data={article} key={article._id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default UserFeed;
