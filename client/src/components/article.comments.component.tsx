import { useState } from "react";
import { useGetCommentsQuery } from "../api/articles/comments.api";
import { useParams } from "react-router";
import { ArticleCommentItem, InfiniteScroll } from "../common/components";

const ArticleComments = () => {
  const [page, setPage] = useState<number>(1);
  const { articleId } = useParams();
  const {
    data: comments,
    isLoading,
    isFetching,
  } = useGetCommentsQuery({
    articleId: articleId as string,
    page,
  });

  const next = () => setPage(page + 1);

  return (
    <div className="px-6 py-7">
      <h2 className="mb-10 text-xl text-black font-bold">Comments</h2>
      {isLoading && <div>Loading...</div>}
      <InfiniteScroll
        next={next}
        currentPage={page}
        isFetching={isFetching}
        totalPages={comments?.totalPages || 0}
      >
        <div className="flex flex-col gap-7">
          {comments?.data.map((c) => (
            <ArticleCommentItem data={c} key={c._id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ArticleComments;
