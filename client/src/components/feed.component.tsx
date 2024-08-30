import React from "react";
import { ArticleItem } from "../common/components";
import { useGetFeedQuery } from "../api/articles/articles.api";

const Feed = () => {
  const { data, isLoading } = useGetFeedQuery(1);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col gap-14">
      {data?.data.map((article) => (
        <ArticleItem data={article} key={article._id} />
      ))}
    </div>
  );
};

export default Feed;
