import { useRepostArticleMutation } from "../../api/articles.api";
import { useForm } from "react-hook-form";
import { Article } from "../../api/dto/get.articles.dto";
import { Button, Loader, TextArea } from "../../../common/ui";
import Modal, { ModalProps } from "../../../common/ui/modal.component";
import ArticleView from "../article.view";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAlerts } from "../../../common/hooks/useAlerts";
import { useTranslation } from "react-i18next";

const quoteArticleSchema = z.object({
  text: z.string().min(1, "Text is required"),
});

type QuoteArticleFormFields = z.infer<typeof quoteArticleSchema>;

type ArticleQuoteModalProps = ModalProps & {
  article: Article;
};

const ArticleQuoteModal = ({
  article,
  ...modalProps
}: ArticleQuoteModalProps) => {
  const alerts = useAlerts();
  const { t } = useTranslation();
  const [triggerRepostArticle, { isLoading }] = useRepostArticleMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteArticleFormFields>({
    resolver: zodResolver(quoteArticleSchema),
  });

  const submitHandler = (data: QuoteArticleFormFields) => {
    triggerRepostArticle({ id: article._id, ...data })
      .unwrap()
      .then(() => {
        alerts.success(t("article.successReposted"));
        modalProps.onClose();
      })
      .catch((err) => {
        alerts.error(`${t("error")}: ${err.data.message}`);
      });
  };

  return (
    <Modal title={t("articleQuote.title")} {...modalProps}>
      <form className="w-[620px]" onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-8 flex flex-col gap-5">
          <TextArea
            placeholder={t("articleQuote.placeholder")}
            rows={1}
            error={errors.text?.message}
            {...register("text")}
          />
          <ArticleView article={article} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="secondary" disabled={isLoading}>
            {isLoading ? (
              <Loader variant="secondary" size="small" />
            ) : (
              t("articleQuote.btn")
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ArticleQuoteModal;
