import Modal, { ModalProps } from "../ui/modal.component";
import { Article } from "../../api/articles/dto/get.articles.dto";
import {
  useEditArticleMutation,
  useGetOneArticleQuery,
} from "../../api/articles/articles.api";
import { ArticleImageFilesSelect, Button, TextArea } from "../ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import ArticleImagesPreview from "./article.images.preview";

const editArticleSchema = z.object({
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

type EditArticleFormFields = z.infer<typeof editArticleSchema>;

type EditArticleModalProps = ModalProps & {
  article: Article;
};

const EditArticleModal = ({
  article,
  ...modalProps
}: EditArticleModalProps) => {
  const [preview, setPreview] = useState<string[] | null>(null);
  const { data, isLoading, isError } = useGetOneArticleQuery(article._id, {
    skip: !modalProps.open,
  });
  const [triggerEditArticle, { isLoading: isLoadingEdit }] =
    useEditArticleMutation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<EditArticleFormFields>({
    resolver: zodResolver(editArticleSchema),
    values: {
      text: data?.text || "",
    },
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

  const submitHandler = (data: EditArticleFormFields) => {
    triggerEditArticle({ id: article._id, ...data })
      .unwrap()
      .then(() => modalProps.onClose())
      .catch((err) =>
        setError("root", { type: "server", message: err.data.message })
      );
  };

  if (isError) {
    alert("Oops... something went wrong");
  }

  return (
    <Modal title="Editing article" {...modalProps}>
      {isLoading && <div className="min-w-[560px]">Loading...</div>}
      {data && (
        <form className="min-w-[560px]" onSubmit={handleSubmit(submitHandler)}>
          <TextArea
            className="mb-8"
            error={errors.text?.message}
            {...register("text")}
          />
          <ArticleImagesPreview preview={preview} defaultImages={data.images} />
          <div className="flex justify-between items-center">
            <ArticleImageFilesSelect {...register("images")} />
            <Button variant="secondary" type="submit" disabled={isLoadingEdit}>
              Edit
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditArticleModal;
