import { PropsWithChildren } from "react";

type ArticleItemFooterProps = PropsWithChildren;

const ArticleItemFooter = ({ children }: ArticleItemFooterProps) => {
  return <>{children}</>;
};

export default ArticleItemFooter;
