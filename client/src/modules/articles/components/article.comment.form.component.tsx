import { useCreateCommentMutation } from "../api/comments.api";
import { useParams } from "react-router";
import { useAlerts } from "../../common/hooks/useAlerts";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { TextArea, Button, Loader } from "../../common/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createCommentSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

type ArticleCommmentFormFields = z.infer<typeof createCommentSchema>;

const ArticleCommentForm = () => {
  const alerts = useAlerts();
  const { t } = useTranslation();
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
      .catch((err: { data: { message: any } }) => {
        alerts.error(`${t("error")}: ${err.data.message}`);
        setError("text", { type: "server", message: err.data.message });
      });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <TextArea
        className="mb-4 bg-white"
        rows={3}
        placeholder={t("articleCommentsForm.placeholder")}
        error={errors.text?.message}
        {...register("text")}
      />
      <div className="flex justify-end items-center">
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? (
            <Loader size="small" variant="secondary" />
          ) : (
            t("articleCommentsForm.submitBtn")
          )}
        </Button>
      </div>
    </form>
  );
};

export default ArticleCommentForm;
