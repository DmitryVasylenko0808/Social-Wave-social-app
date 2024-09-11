import { z } from "zod";
import { TextArea, Button } from "../ui";
import Modal, { ModalProps } from "../ui/modal.component";
import { useEditCommentMutation } from "../../api/articles/comments.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment } from "../../api/articles/dto/get.comments.dto";

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
      .catch((err) =>
        setError("text", { type: "server", message: err.data.message })
      );
  };

  return (
    <Modal title="Editing comment" {...modalProps}>
      <form className="min-w-[560px]" onSubmit={handleSubmit(submitHandler)}>
        <TextArea
          className="mb-8"
          error={errors.text?.message}
          {...register("text")}
        />
        <div className="flex justify-end">
          <Button variant="secondary" type="submit" disabled={isLoading}>
            Edit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCommentModal;
