import { Button, Loader, Modal } from "../ui";
import { ModalProps } from "../ui/modal.component";
import { Article } from "../../api/articles/dto/get.articles.dto";
import { useDeleteArticleMutation } from "../../api/articles/articles.api";

type DeleteArticleModalProps = ModalProps & {
  article: Article;
};

const DeleteArticleModal = ({
  article,
  ...modalProps
}: DeleteArticleModalProps) => {
  const [triggerDeleteArticle, { isLoading }] = useDeleteArticleMutation();

  const handleClickDelete = () => {
    triggerDeleteArticle(article._id)
      .unwrap()
      .then(() => modalProps.onClose())
      .catch((err) => alert(err.data.message));
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
