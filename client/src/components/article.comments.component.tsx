import { useGetCommentsQuery } from "../api/articles/comments.api";
import { useParams } from "react-router";
import { usePage } from "../hooks/usePage";
import {
  ArticleCommentItem,
  InfiniteScroll,
  NoData,
} from "../common/components";
import { List, ListItem } from "../common/ui";

const ArticleComments = () => {
  const { page, nextPage } = usePage();
  const { articleId } = useParams();
  const { data: comments, isFetching } = useGetCommentsQuery({
    articleId: articleId as string,
    page,
  });

  if (comments?.data.length === 0) {
    return <NoData message="No comments" />;
  }

  return (
    <div className="px-6 py-7">
      <h2 className="mb-10 text-xl text-black font-bold">Comments</h2>
      <InfiniteScroll
        next={nextPage}
        currentPage={page}
        isFetching={isFetching}
        totalPages={comments?.totalPages || 0}
      >
        <List className="gap-7">
          {comments?.data.map((comment) => (
            <ListItem key={comment._id}>
              <ArticleCommentItem data={comment} />
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default ArticleComments;
