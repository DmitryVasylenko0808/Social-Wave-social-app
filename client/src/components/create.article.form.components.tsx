import { Controller, useForm } from "react-hook-form";
import { TextArea, Button, Loader } from "../common/ui";
import { useCreateArticleMutation } from "../api/articles/articles.api";
import {
  ArticleImagesPreview,
  ArticleImageFilesSelect,
} from "../common/components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImagePreview } from "../hooks/useImagePreview";

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
      .catch((err) =>
        setError("text", { type: "server", message: err.data.message })
      );
  };

  return (
    <form
      className="mb-8 p-4 pb-2.5 bg-labelFill"
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextArea
        className="mb-4 bg-white"
        rows={5}
        placeholder="Write an article..."
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
          {isLoading ? <Loader size="small" variant="secondary" /> : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CreateArticleForm;
