import { z } from "zod";
import { TextArea } from "../common/ui";
import { Button } from "../common/ui";
import { useCreateArticleMutation } from "../api/articles/articles.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const createArticleSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

type CreateArticleFormFields = z.infer<typeof createArticleSchema>;

const CreateArticleForm = () => {
  const [triggerCreateArticle, { isLoading }] = useCreateArticleMutation();

  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateArticleFormFields>({
    resolver: zodResolver(createArticleSchema),
  });

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
      <div className="flex justify-end items-center">
        <Button type="submit" variant="secondary" disabled={isLoading}>
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateArticleForm;
