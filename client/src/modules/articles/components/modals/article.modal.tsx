import { useNavigate } from "react-router-dom";
import { ArticleCommentForm, ArticleComments, ArticleDetails } from "..";
import { Modal } from "../../../common/ui";

const ArticleModal = () => {
  const navigate = useNavigate();

  const handleClickClose = () => navigate(-1);
  const goBackAfterDelete = () => navigate(-1);

  return (
    <Modal onClose={handleClickClose} open>
      <div className="w-[620px]">
        <ArticleDetails afterDelete={goBackAfterDelete} />
        <ArticleCommentForm />
        <ArticleComments />
      </div>
    </Modal>
  );
};

export default ArticleModal;
