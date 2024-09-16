import { useGetCommentsQuery } from "../api/articles/comments.api";
import { useParams } from "react-router";
import { usePage } from "../hooks/usePage";
import { ArticleCommentItem, InfiniteScroll } from "../common/components";

const ArticleComments = () => {
  const { page, nextPage } = usePage();
  const { articleId } = useParams();
  const { data: comments, isFetching } = useGetCommentsQuery({
    articleId: articleId as string,
    page,
  });

  return (
    <div className="px-6 py-7">
      <h2 className="mb-10 text-xl text-black font-bold">Comments</h2>
      <InfiniteScroll
        next={nextPage}
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
