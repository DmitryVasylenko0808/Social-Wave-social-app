import { useNavigate } from "react-router-dom";
import { ArticleCommentForm, ArticleComments, ArticleDetails } from "..";
import { Modal } from "../../../common/ui";

const ArticleModal = () => {
  const navigate = useNavigate();

  const handleClickClose = () => navigate(-1);
  const goBackAfterDelete = () => navigate(-1);

  return (
    <Modal
      className="max-md:max-h-screen max-md:rounded-none"
      onClose={handleClickClose}
      open
    >
      <div className="w-[620px] max-md:w-full">
        <ArticleDetails afterDelete={goBackAfterDelete} />
        <ArticleCommentForm />
        <ArticleComments />
      </div>
    </Modal>
  );
};

export default ArticleModal;
