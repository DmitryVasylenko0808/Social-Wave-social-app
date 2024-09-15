import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArticleImageFilesSelect,
  TextArea,
  Button,
  Loader,
} from "../common/ui";
import { useCreateArticleMutation } from "../api/articles/articles.api";
import { ArticleImagesPreview } from "../common/components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [preview, setPreview] = useState<string[] | null>(null);
  const [triggerCreateArticle, { isLoading }] = useCreateArticleMutation();

  const {
    register,
    setError,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateArticleFormFields>({
    resolver: zodResolver(createArticleSchema),
  });

  const files = watch("images") as File[];

  useEffect(() => {
    if (files?.length) {
      const newPreviews: string[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.result) {
            newPreviews.push(reader.result as string);
            if (newPreviews.length === files.length) {
              setPreview(newPreviews);
            }
          }
        };

        reader.readAsDataURL(file);
      });
    } else {
      setPreview(null);
    }
  }, [files]);

  const submitHandler = (data: CreateArticleFormFields) => {
    triggerCreateArticle(data)
      .unwrap()
      .then(() => reset())
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
      <ArticleImagesPreview preview={preview} />
      <div className="flex justify-between items-center">
        <ArticleImageFilesSelect {...register("images")} />
        <Button type="submit" variant="secondary" disabled={isLoading}>
          {isLoading ? <Loader size="small" variant="secondary" /> : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CreateArticleForm;
