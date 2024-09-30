import { Controller, useForm } from "react-hook-form";
import Modal, { ModalProps } from "../ui/modal.component";
import { Article } from "../../api/articles/dto/get.articles.dto";
import {
  useEditArticleMutation,
  useGetOneArticleQuery,
} from "../../api/articles/articles.api";
import { Button, Loader, TextArea } from "../ui";
import { ArticleImageFilesSelect, ArticleImagesPreview } from ".";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImagePreview } from "../../hooks/useImagePreview";
import { useAlerts } from "../../hooks/useAlerts";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetOneArticleQuery(article._id, {
    skip: !modalProps.open,
  });
  const [triggerEditArticle, { isLoading: isLoadingEdit }] =
    useEditArticleMutation();
  const alerts = useAlerts();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<EditArticleFormFields>({
    resolver: zodResolver(editArticleSchema),
    values: {
      text: data?.text || "",
    },
  });
  const { imagesPreview, handleImagesChange } = useImagePreview(data?.images);

  useEffect(() => {
    if (isError) {
      alerts.error(t("error"));
    }
  }, [isError]);

  const submitHandler = (data: EditArticleFormFields) => {
    triggerEditArticle({ id: article._id, ...data })
      .unwrap()
      .then(() => modalProps.onClose())
      .catch((err) => {
        setError("root", { type: "server", message: err.data.message });
      });
  };

  return (
    <Modal title={t("editArticle.title")} {...modalProps}>
      {isLoading && (
        <div className="min-w-[560px]">
          <Loader
            position="center"
            size="big"
            variant="primary"
            className="py-5"
          />
        </div>
      )}
      {data && (
        <form className="w-modal" onSubmit={handleSubmit(submitHandler)}>
          <TextArea
            className="mb-8"
            rows={8}
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
            <Button variant="secondary" type="submit" disabled={isLoadingEdit}>
              {isLoadingEdit ? (
                <Loader size="small" variant="secondary" />
              ) : (
                t("editArticle.submitBtn")
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditArticleModal;
