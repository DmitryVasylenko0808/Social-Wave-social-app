import Modal, { ModalProps } from "../ui/modal.component";
import { Article } from "../../api/articles/dto/get.articles.dto";
import {
  useEditArticleMutation,
  useGetOneArticleQuery,
} from "../../api/articles/articles.api";
import { Button, TextArea } from "../ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const editArticleSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

type EditArticleFormFields = z.infer<typeof editArticleSchema>;

type EditArticleModalProps = ModalProps & {
  article: Article;
};

const EditArticleModal = ({
  article,
  ...modalProps
}: EditArticleModalProps) => {
  const { data, isLoading, isError } = useGetOneArticleQuery(article._id, {
    skip: !modalProps.open,
  });
  const [triggerEditArticle, { isLoading: isLoadingEdit }] =
    useEditArticleMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditArticleFormFields>({
    resolver: zodResolver(editArticleSchema),
    values: {
      text: data?.text || "",
    },
  });

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
          <div className="flex justify-end">
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
