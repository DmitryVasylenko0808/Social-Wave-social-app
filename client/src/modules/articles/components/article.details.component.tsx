import { useGetOneArticleQuery } from "../api/articles.api";
import { Navigate, useParams } from "react-router";
import { ArticleItem, ArticleSkeleton } from ".";

type ArticleDetailsProps = {
  afterDelete?: () => void;
};

const ArticleDetails = ({ afterDelete }: ArticleDetailsProps) => {
  const { articleId } = useParams();
  const {
    data: article,
    isLoading,
    isError,
  } = useGetOneArticleQuery(articleId as string);

  if (isError) {
    return <Navigate to="*" replace />;
  }

  return (
    <div>
      {isLoading && <ArticleSkeleton />}
      {article && <ArticleItem data={article} afterDelete={afterDelete} />}
    </div>
  );
};

export default ArticleDetails;
