import { useImagePreview } from "../../common/hooks/useImagePreview";
import { useAlerts } from "../../common/hooks/useAlerts";
import { useTranslation } from "react-i18next";
import { useCreateArticleMutation } from "../api/articles.api";
import { Controller, useForm } from "react-hook-form";
import { TextArea, Button, Loader } from "../../common/ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleImageFilesSelect, ArticleImagesPreview } from ".";

const createArticleSchema = z.object({
  text: z.string().min(1, "Text is required"),
  images: z
    .any()
    .refine(
      (files: FileList) => {
        return !files.length || files.length <= 5;
      },
      {
        message: "Invalid count of images.",
      }
    )
    .optional(),
});

type CreateArticleFormFields = z.infer<typeof createArticleSchema>;

const CreateArticleForm = () => {
  const alerts = useAlerts();
  const { t } = useTranslation();
  const { imagesPreview, handleImagesChange, clearPreviewImages } =
    useImagePreview();
  const [triggerCreateArticle, { isLoading }] = useCreateArticleMutation();

  const {
    register,
    setError,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateArticleFormFields>({
    resolver: zodResolver(createArticleSchema),
  });

  const submitHandler = (data: CreateArticleFormFields) => {
    triggerCreateArticle(data)
      .unwrap()
      .then(() => {
        reset();
        clearPreviewImages();
      })
      .catch((err) => {
        alerts.error(`${t("error")}: ${err.data.message}`);
        setError("text", { type: "server", message: err.data.message });
      });
  };

  return (
    <form
      className="mb-8 p-4 pb-2.5 bg-labelFill dark:bg-dark-100"
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextArea
        className="mb-4 bg-white"
        rows={5}
        placeholder={t("createArticle.placeholder")}
        error={errors.text?.message}
        {...register("text")}
      />
      <ArticleImagesPreview preview={imagesPreview} />
      <div className="flex justify-between items-center">
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <ArticleImageFilesSelect
              {...register("images")}
              onChange={(e) => {
                field.onChange(e);
                handleImagesChange(e);
              }}
            />
          )}
        />

        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading ? (
            <Loader size="small" variant="secondary" />
          ) : (
            t("createArticle.submitBtn")
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateArticleForm;
