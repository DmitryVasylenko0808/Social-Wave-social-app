import React, { useEffect, useState } from "react";
import { ArticleItem } from "../common/components";
import { useGetFeedQuery } from "../api/articles/articles.api";
import { InfiniteScroll } from "../common/components";

const Feed = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetFeedQuery(page);

  const nextPage = () => setPage(page + 1);

  return (
    <div className="px-6">
      <InfiniteScroll
        next={nextPage}
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

export default Feed;
