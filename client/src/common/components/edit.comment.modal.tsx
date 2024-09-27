import { z } from "zod";
import { TextArea, Button, Loader } from "../ui";
import Modal, { ModalProps } from "../ui/modal.component";
import { useEditCommentMutation } from "../../api/articles/comments.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment } from "../../api/articles/dto/get.comments.dto";
import { useAlerts } from "../../hooks/useAlerts";
import { useTranslation } from "react-i18next";

const editCommentSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

type EditCommentFormFields = z.infer<typeof editCommentSchema>;

type EditCommentModalProps = ModalProps & {
  comment: Comment;
};

const EditCommentModal = ({
  comment,
  ...modalProps
}: EditCommentModalProps) => {
  const alerts = useAlerts();
  const { t } = useTranslation();
  const [triggerEditComment, { isLoading }] = useEditCommentMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditCommentFormFields>({
    resolver: zodResolver(editCommentSchema),
    values: {
      text: comment.text,
    },
  });

  const submitHandler = (data: EditCommentFormFields) => {
    triggerEditComment({
      articleId: comment.article,
      commentId: comment._id,
      ...data,
    })
      .unwrap()
      .then(() => modalProps.onClose())
      .catch((err) => {
        alerts.error(`${t("error")}: ${err.data.message}`);
        setError("text", { type: "server", message: err.data.message });
      });
  };

  return (
    <Modal title={t("editComment.title")} {...modalProps}>
      <form className="w-modal" onSubmit={handleSubmit(submitHandler)}>
        <TextArea
          className="mb-8"
          rows={4}
          error={errors.text?.message}
          {...register("text")}
        />
        <div className="flex justify-end">
          <Button variant="secondary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader size="small" variant="secondary" />
            ) : (
              t("editComment.submitBtn")
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCommentModal;
