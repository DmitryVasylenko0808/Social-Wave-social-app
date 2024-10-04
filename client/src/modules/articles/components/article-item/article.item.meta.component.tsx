import { useTranslation } from "react-i18next";
import { PropsWithChildren } from "react";
import { ArticleItemProps } from "./article.item.component";
import ReactTimeAgo from "react-time-ago";

type ArticleItemMetaProps = ArticleItemProps & PropsWithChildren;

const ArticleItemMeta = ({ data, children }: ArticleItemMetaProps) => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-4">
      <span className="text-secondary-100">
        <ReactTimeAgo
          date={new Date(data.createdAt)}
          locale={i18n.resolvedLanguage}
          timeStyle="twitter"
          tick={false}
        />
      </span>
      {children}
    </div>
  );
};

export default ArticleItemMeta;
