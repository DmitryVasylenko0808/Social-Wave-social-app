import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../common/ui";
import { useGetOneArticleQuery } from "../api/articles/articles.api";
import { ArticleItem } from "../common/components";

const ArticleDetails = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const {
    data: article,
    isLoading,
    isError,
  } = useGetOneArticleQuery(articleId as string);

  const handleClickBack = () => navigate(-1);

  if (isError) {
    return <span>Error.</span>;
  }

  return (
    <div className="px-6 py-2">
      <div className="mb-10 flex items-center gap-3.5">
        <Button variant="terciary" onClick={handleClickBack}>
          <ArrowLeft />
        </Button>
      </div>
      {isLoading && <span>Loading...</span>}
      {article && <ArticleItem data={article} />}
    </div>
  );
};

export default ArticleDetails;
