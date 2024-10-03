import { useAuth } from "../../../../hooks/useAuth";
import { Article } from "../../../../api/articles/dto/get.articles.dto";
import ArticleItemHeader from "./article.item.header.component";
import ArticleItemBody from "./article.item.body.component";
import ArticleItemFooter from "./article.item.footer.component";
import ArticleItemAuthor from "./article.item.author.component";
import ArticleItemMeta from "./article.item.meta.component";
import ArticleItemMenu from "./article.item.menu";
import ArticleItemReposted from "./article.item.reposted.component";
import ArticleItemActions from "./article.item.actions.component";

export type ArticleItemProps = {
  data: Article;
  reposted?: boolean;

  deleteAfter?: () => void;
};

const ArticleItem = ({ data, reposted, deleteAfter }: ArticleItemProps) => {
  const { user } = useAuth();

  const isUserArticle = data.author._id === user.userId;
  const isShowMenu = isUserArticle && !reposted;

  return (
    <article>
      <ArticleItemHeader
        data={data}
        reposted={reposted}
        deleteAfter={deleteAfter}
      >
        <ArticleItemAuthor data={data} />
        <ArticleItemMeta data={data}>
          {isShowMenu && (
            <ArticleItemMenu data={data} deleteAfter={deleteAfter} />
          )}
        </ArticleItemMeta>
      </ArticleItemHeader>
      <ArticleItemBody data={data} />
      <ArticleItemFooter>
        {data.repostedArticle ? (
          <ArticleItemReposted repostedArticle={data.repostedArticle} />
        ) : (
          <ArticleItemActions data={data} />
        )}
      </ArticleItemFooter>
    </article>
  );
};

export default ArticleItem;
