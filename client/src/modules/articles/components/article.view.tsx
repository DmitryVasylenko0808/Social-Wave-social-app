import { Link } from "react-router-dom";
import { Article } from "../../../api/articles/dto/get.articles.dto";
import { Avatar } from "../../common/ui";
import { articlesImgUrl, userAvatarsUrl } from "../../../api/constants";
import ReactTimeAgo from "react-time-ago";
import { useTranslation } from "react-i18next";

type ArticleViewProps = {
  article: Article;
};

const ArticleView = ({ article }: ArticleViewProps) => {
  const { i18n } = useTranslation();

  return (
    <div className="p-4 border-2 rounded-2xl border-secondary-50 dark:border-dark-300">
      <header className="mb-4">
        <div className="flex items-center gap-4">
          <Link to={`/users/${article.author._id}/profile`}>
            <Avatar
              variant="small"
              src={
                article.author.avatar
                  ? `${userAvatarsUrl}/${article?.author.avatar}`
                  : `${userAvatarsUrl}/nullavatar.jpg`
              }
              alt={`Avatar ${article.author.firstName} ${article.author.secondName}`}
            />
          </Link>
          <span>
            <Link
              to={`/users/${article.author._id}/profile`}
              className="text-secondary-300 font-medium dark:text-white"
            >
              {article.author.firstName} {article.author.secondName}
            </Link>
          </span>
        </div>
      </header>
      <main className="mb-8">
        <p className="mb-4 dark:text-secondary-100">{article?.text}</p>
        {!!article.images?.length && (
          <div className="flex flex-wrap gap-4">
            {article.images.map((image, index) => (
              <img
                className="size-fit h-[200px] rounded-xl"
                src={`${articlesImgUrl}/${image}`}
                alt={`image ${index}`}
                key={index}
              />
            ))}
          </div>
        )}
      </main>
      <footer>
        <p className="text-sm font-medium text-secondary-100">
          Published:{" "}
          <ReactTimeAgo
            className="text-black dark:text-white"
            date={new Date(article.createdAt)}
            locale={i18n.resolvedLanguage}
            timeStyle="twitter"
            tick={false}
          />
        </p>
      </footer>
    </div>
  );
};

export default ArticleView;
