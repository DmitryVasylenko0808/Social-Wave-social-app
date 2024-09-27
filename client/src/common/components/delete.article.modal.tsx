import { Button, Loader, Modal } from "../ui";
import { ModalProps } from "../ui/modal.component";
import { Article } from "../../api/articles/dto/get.articles.dto";
import { useDeleteArticleMutation } from "../../api/articles/articles.api";
import { useAlerts } from "../../hooks/useAlerts";
import { useTranslation } from "react-i18next";

type DeleteArticleModalProps = ModalProps & {
  article: Article;

  deleteAfter?: () => void;
};

const DeleteArticleModal = ({
  article,
  deleteAfter,
  ...modalProps
}: DeleteArticleModalProps) => {
  const alerts = useAlerts();
  const { t } = useTranslation();
  const [triggerDeleteArticle, { isLoading }] = useDeleteArticleMutation();

  const handleClickDelete = () => {
    triggerDeleteArticle(article._id)
      .unwrap()
      .then(() => {
        modalProps.onClose();
        deleteAfter?.();
      })
      .catch((err) => {
        alerts.error(`${t("error")}: ${err.data.message}`);
      });
  };

  return (
    <Modal title={t("deleteArticle.title")} {...modalProps}>
      <p className="mb-8 dark:text-secondary-50">{t("deleteArticle.body")}</p>
      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={handleClickDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader size="small" variant="secondary" />
          ) : (
            t("deleteArticle.submitBtn")
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteArticleModal;
