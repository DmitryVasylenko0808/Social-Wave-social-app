import { Article } from "../../api/dto/get.articles.dto";
import { ArticleItem } from "..";

type ArticleItemRepostedProps = {
  repostedArticle: Article;
};

const ArticleItemReposted = ({ repostedArticle }: ArticleItemRepostedProps) => {
  return (
    <div className="px-6 py-3 border-2 rounded-2xl border-secondary-50 dark:border-dark-200 dark:border">
      <ArticleItem data={repostedArticle} reposted={!!repostedArticle} />
    </div>
  );
};

export default ArticleItemReposted;
