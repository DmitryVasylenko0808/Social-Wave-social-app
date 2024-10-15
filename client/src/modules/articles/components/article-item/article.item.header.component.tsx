import { PropsWithChildren } from "react";

type ArticleItemHeaderProps = PropsWithChildren;

const ArticleItemHeader = ({ children }: ArticleItemHeaderProps) => {
  return (
    <div className="mb-8 flex justify-between items-center">{children}</div>
  );
};

export default ArticleItemHeader;
