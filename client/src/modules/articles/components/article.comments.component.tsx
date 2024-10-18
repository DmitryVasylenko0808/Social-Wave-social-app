import { useGetCommentsQuery } from "../../../api/articles/comments.api";
import { useParams } from "react-router";
import { usePage } from "../../../hooks/usePage";
import { useTranslation } from "react-i18next";
import { InfiniteScroll, NoData } from "../../common/components";
import { List, ListItem } from "../../common/ui";
import { CommentItem } from ".";

const ArticleComments = () => {
  const { t } = useTranslation();
  const { articleId } = useParams();
  const { page, nextPage } = usePage();
  const { data: comments, isFetching } = useGetCommentsQuery({
    articleId: articleId as string,
    page,
  });

  if (comments?.data.length === 0) {
    return <NoData message={t("noData.comments")} />;
  }

  return (
    <div className="">
      <h2 className="mb-5 text-lg text-black font-bold dark:text-white">
        {t("articleCommments.title")}
      </h2>
      <InfiniteScroll
        next={nextPage}
        currentPage={page}
        isFetching={isFetching}
        totalPages={comments?.totalPages || 0}
      >
        <List className="pl-3 gap-7">
          {comments?.data.map((comment) => (
            <ListItem key={comment._id}>
              <CommentItem data={comment} />
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default ArticleComments;
