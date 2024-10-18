import { Link } from "react-router-dom";
import { userAvatarsUrl } from "../../../../api/constants";
import { Avatar } from "../../../common/ui";
import { ArticleItemProps } from "./article.item.component";
import { useTranslation } from "react-i18next";

type ArticleItemAuthorProps = ArticleItemProps;

const ArticleItemAuthor = ({ data }: ArticleItemAuthorProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4">
      <Link to={`/users/${data.author._id}/profile`}>
        <Avatar
          variant="medium"
          src={
            data?.author.avatar
              ? `${userAvatarsUrl}/${data?.author.avatar}`
              : `${userAvatarsUrl}/nullavatar.jpg`
          }
          alt={`Avatar ${data?.author.firstName} ${data?.author.secondName}`}
        />
      </Link>
      <span>
        <Link
          to={`/users/${data.author._id}/profile`}
          className="text-secondary-300 font-medium dark:text-white"
        >
          {data.author.firstName} {data.author.secondName}
        </Link>{" "}
        {data.repostedArticle && (
          <span className="text-secondary-100">{t("article.reposted")}</span>
        )}
      </span>
    </div>
  );
};

export default ArticleItemAuthor;
