import { z } from "zod";
import { TextArea, Button, Loader } from "../common/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCommentMutation } from "../api/articles/comments.api";
import { useParams } from "react-router";

const createCommentSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

type ArticleCommmentFormFields = z.infer<typeof createCommentSchema>;

const ArticleCommentForm = () => {
  const { articleId } = useParams();
  const [triggerCreateComment, { isLoading }] = useCreateCommentMutation();

  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArticleCommmentFormFields>({
    resolver: zodResolver(createCommentSchema),
  });

  const submitHandler = (data: ArticleCommmentFormFields) => {
    const createCommentData = { articleId: articleId as string, ...data };

    triggerCreateComment(createCommentData)
      .unwrap()
      .then(() => reset())
      .catch((err) =>
        setError("text", { type: "server", message: err.data.message })
      );
  };

  return (
    <form
      className="p-4 pb-2.5 bg-labelFill"
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextArea
        className="mb-4 bg-white"
        rows={5}
        placeholder="Write a comment..."
        error={errors.text?.message}
        {...register("text")}
      />
      <div className="flex justify-end items-center">
        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading ? <Loader size="small" variant="secondary" /> : "Comment"}
        </Button>
      </div>
    </form>
  );
};

export default ArticleCommentForm;
