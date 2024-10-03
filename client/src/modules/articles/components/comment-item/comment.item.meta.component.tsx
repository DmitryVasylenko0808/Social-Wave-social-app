import ReactTimeAgo from "react-time-ago";
import { CommentItemProps } from "./comment.item";
import { useTranslation } from "react-i18next";
import { PropsWithChildren } from "react";

type CommentItemMetaProps = CommentItemProps & PropsWithChildren;

const CommentItemMeta = ({ data, children }: CommentItemMetaProps) => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-4">
      <span className="text-secondary-100">
        <ReactTimeAgo
          date={new Date(data.createdAt)}
          locale={i18n.resolvedLanguage}
          timeStyle="twitter"
        />
      </span>
      {children}
    </div>
  );
};

export default CommentItemMeta;
