import { useGetOneArticleQuery } from "../../../api/articles/articles.api";
import { Navigate, useNavigate, useParams } from "react-router";
import { NavigateBack } from "../../common/components";
import { ArticleItem, ArticleSkeleton } from ".";

const ArticleDetails = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const {
    data: article,
    isLoading,
    isError,
  } = useGetOneArticleQuery(articleId as string);

  const goBackAfterDelete = () => navigate(-1);

  if (isError) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className="px-6 py-2">
      <NavigateBack />
      {isLoading && <ArticleSkeleton />}
      {article && (
        <ArticleItem data={article} deleteAfter={goBackAfterDelete} />
      )}
    </div>
  );
};

export default ArticleDetails;
