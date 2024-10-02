import {
  ArticleCommentForm,
  ArticleComments,
  ArticleDetails,
} from "../modules/articles/components";

const OneArticlePage = () => {
  return (
    <>
      <ArticleDetails />
      <ArticleCommentForm />
      <ArticleComments />
    </>
  );
};

export default OneArticlePage;
