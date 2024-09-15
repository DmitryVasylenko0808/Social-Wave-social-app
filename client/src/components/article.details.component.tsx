import { useParams } from "react-router";
import { useGetOneArticleQuery } from "../api/articles/articles.api";
import {
  ArticleItem,
  ArticleSkeleton,
  NavigateBack,
} from "../common/components";

const ArticleDetails = () => {
  const { articleId } = useParams();
  const {
    data: article,
    isLoading,
    isError,
  } = useGetOneArticleQuery(articleId as string);

  if (isError) {
    return <span>Error.</span>;
  }

  return (
    <div className="px-6 py-2">
      <NavigateBack />
      {isLoading && <ArticleSkeleton />}
      {article && <ArticleItem data={article} />}
    </div>
  );
};

export default ArticleDetails;
