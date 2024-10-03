import { ArticleItemProps } from "./article.item.component";
import { PropsWithChildren } from "react";

type ArticleItemHeaderProps = ArticleItemProps & PropsWithChildren;

const ArticleItemHeader = ({ children }: ArticleItemHeaderProps) => {
  return (
    <div className="mb-4 flex justify-between items-center">{children}</div>
  );
};

export default ArticleItemHeader;
