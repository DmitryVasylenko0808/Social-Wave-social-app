import { ArticleItem } from "../common/components";
import { useGetFeedQuery } from "../api/articles/articles.api";
import { InfiniteScroll } from "../common/components";
import { usePage } from "../hooks/usePage";

const Feed = () => {
  const { page, nextPage } = usePage();
  const { data, isFetching } = useGetFeedQuery(page);

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
