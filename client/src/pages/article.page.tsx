import {
  ArticleDetails,
  ArticleCommentForm,
  ArticleComments,
} from "../modules/articles/components";
import { useNavigate } from "react-router";

const ArticlePage = () => {
  const navigate = useNavigate();

  const goHomeAfterDelete = () => navigate("/");

  return (
    <div className="p-6">
      <ArticleDetails afterDelete={goHomeAfterDelete} />
      <ArticleCommentForm />
      <ArticleComments />
    </div>
  );
};

export default ArticlePage;
