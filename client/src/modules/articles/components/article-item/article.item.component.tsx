import { Article } from "../../../../api/articles/dto/get.articles.dto";
import ArticleItemHeader from "./article.item.header.component";
import ArticleItemBody from "./article.item.body.component";
import ArticleItemFooter from "./article.item.footer.component";

export type ArticleItemProps = {
  data: Article;
  reposted?: boolean;

  deleteAfter?: () => void;
};

const ArticleItem = ({ data, reposted, deleteAfter }: ArticleItemProps) => {
  return (
    <article>
      <ArticleItemHeader
        data={data}
        reposted={reposted}
        deleteAfter={deleteAfter}
      />
      <ArticleItemBody data={data} />
      <ArticleItemFooter data={data} />
    </article>
  );
};

export default ArticleItem;
