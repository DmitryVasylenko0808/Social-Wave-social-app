import { useRef, useState } from "react";
import { Button, Menu, MenuItem } from "../../../common/ui";
import { Repeat2, TextQuote } from "lucide-react";
import { useRepostArticleMutation } from "../../api/articles.api";
import { useClickOutside } from "../../../common/hooks/useClickOutside";
import { cn } from "../../../../utils/cn";
import { useAlerts } from "../../../common/hooks/useAlerts";
import { useTranslation } from "react-i18next";
import { Article } from "../../api/dto/get.articles.dto";
import { useModal } from "../../../common/hooks/useModal";
import ArticleQuoteModal from "../modals/article.quote.modal";

type ArticleMenuRepostProps = {
  article: Article;
  reposts: string[];
  disabled: boolean;
};

const ArticleMenuRepost = ({
  article,
  reposts,
  disabled,
}: ArticleMenuRepostProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const alerts = useAlerts();
  const quoteModal = useModal();
  const { t } = useTranslation();
  const [triggerRepostArticle] = useRepostArticleMutation();

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickMenuRepost = () => {
    if (!disabled) {
      setOpenMenu(true);
    }
  };

  const handleClickRepost = () => {
    triggerRepostArticle({ id: article._id })
      .unwrap()
      .then(() => {
        alerts.success(t("article.successReposted"));
      })
      .catch((err) => {
        alerts.error(`${t("error")}: ${err.data.message}`);
      })
      .finally(() => setOpenMenu(false));
  };

  const handleClickQuoteRepost = () => quoteModal.onOpen();

  const repostClasses = cn("", {
    "text-primary-200": disabled === true,
  });

  return (
    <>
      <div className="relative">
        <Button
          disabled={disabled}
          className="text-sm gap-2"
          variant="terciary"
          onClick={handleClickMenuRepost}
        >
          <Repeat2 size={22} className={repostClasses} />
          <span>{reposts.length}</span>
        </Button>
        <Menu open={openMenu} ref={ref}>
          <MenuItem onClick={handleClickRepost}>
            <Repeat2 size={18} />
            Repost
          </MenuItem>
          <MenuItem onClick={handleClickQuoteRepost}>
            <TextQuote size={18} /> Quote repost
          </MenuItem>
        </Menu>
      </div>
      {article && (
        <ArticleQuoteModal
          open={quoteModal.open}
          onClose={quoteModal.onClose}
          article={article}
        />
      )}
    </>
  );
};

export default ArticleMenuRepost;
