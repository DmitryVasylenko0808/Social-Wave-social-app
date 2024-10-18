import { useGetOneArticleQuery } from "../../../api/articles/articles.api";
import { Navigate, useNavigate, useParams } from "react-router";
import { ArticleItem, ArticleSkeleton } from ".";

const ArticleDetails = () => {
  const { articleId } = useParams();
  const {
    data: article,
    isLoading,
    isError,
  } = useGetOneArticleQuery(articleId as string);
  const navigate = useNavigate();

  const goBackAfterDelete = () => navigate(-1);

  if (isError) {
    return <Navigate to="*" replace />;
  }

  return (
    <div>
      {isLoading && <ArticleSkeleton />}
      {article && (
        <ArticleItem data={article} deleteAfter={goBackAfterDelete} />
      )}
    </div>
  );
};

export default ArticleDetails;
