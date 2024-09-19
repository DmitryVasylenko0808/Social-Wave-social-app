import { Button, Loader, Modal } from "../ui";
import { ModalProps } from "../ui/modal.component";
import { Article } from "../../api/articles/dto/get.articles.dto";
import { useDeleteArticleMutation } from "../../api/articles/articles.api";
import { useAlerts } from "../../hooks/useAlerts";

type DeleteArticleModalProps = ModalProps & {
  article: Article;

  deleteAfter?: () => void;
};

const DeleteArticleModal = ({
  article,
  deleteAfter,
  ...modalProps
}: DeleteArticleModalProps) => {
  const [triggerDeleteArticle, { isLoading }] = useDeleteArticleMutation();
  const alerts = useAlerts();

  const handleClickDelete = () => {
    triggerDeleteArticle(article._id)
      .unwrap()
      .then(() => {
        modalProps.onClose();
        deleteAfter?.();
      })
      .catch((err) => {
        alerts.error(`Oops... something went wrong: ${err.data.message}`);
      });
  };

  return (
    <Modal title="Dou really want to delete this article?" {...modalProps}>
      <p className="mb-8">
        If you delete this article, it will be permanently removed and the
        action cannot be undone.
      </p>
      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={handleClickDelete}
          disabled={isLoading}
        >
          {isLoading ? <Loader size="small" variant="secondary" /> : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteArticleModal;
