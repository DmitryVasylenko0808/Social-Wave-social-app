import {
  useToggleLikeArticleMutation,
  useRepostArticleMutation,
} from "../../../../api/articles/articles.api";
import { useToggleBookmarkArticleMutation } from "../../../../api/articles/bookmarked.article.api";
import { useAlerts } from "../../../../hooks/useAlerts";
import { useAuth } from "../../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Heart, MessageSquare, Repeat2, Bookmark } from "lucide-react";
import { Button } from "../../../common/ui";
import { ArticleItemProps } from "./article.item.component";
import { cn } from "../../../../utils/cn";
import { useMemo } from "react";

type ArticleItemActionsProps = ArticleItemProps;

const ArticleItemActions = ({ data }: ArticleItemActionsProps) => {
  const alerts = useAlerts();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [triggerToggleLikeArticle] = useToggleLikeArticleMutation();
  const [triggerToggleBookmarkArticle] = useToggleBookmarkArticleMutation();
  const [triggerRepostArticle] = useRepostArticleMutation();

  const handleClickLike = () => {
    triggerToggleLikeArticle({
      id: data._id,
      isLiked,
    })
      .unwrap()
      .catch((err) => {
        alerts.error(`Oops... something went wrong: ${err.data.message}`);
      });
  };

  const handleClickRepost = () => {
    if (!isReposted) {
      triggerRepostArticle(data._id)
        .unwrap()
        .then(() => alerts.success(t("article.successReposted")))
        .catch((err) => {
          alerts.error(`${t("error")}: ${err.data.message}`);
        });
    }
  };

  const handleClickBookmark = () => {
    triggerToggleBookmarkArticle({
      id: data._id,
      isBookmarked,
    })
      .unwrap()
      .catch((err) => {
        alerts.error(`${t("error")}: ${err.data.message}`);
      });
  };

  const isLiked = useMemo(
    () => data.likes.includes(user.userId as string),
    [data.likes, user]
  );
  const isReposted = useMemo(
    () => data.reposts.includes(user.userId as string),
    [data.reposts, user]
  );
  const isBookmarked = useMemo(
    () => data.bookmarks.includes(user.userId as string),
    [data.bookmarks, user]
  );

  const heartClasses = cn("", {
    "fill-primary-200 text-primary-200": isLiked === true,
  });
  const repostClasses = cn("", {
    "text-primary-200": isReposted === true,
  });
  const bookmarkClasses = cn("", {
    "fill-secondary-100 hover:fill-secondary-200": isBookmarked === true,
  });

  return (
    <div className="flex">
      <div className="flex-1 flex justify-center">
        <Button variant="terciary" onClick={handleClickLike}>
          <Heart className={heartClasses} />
          <span>{data.likes.length}</span>
        </Button>
      </div>
      <div className="flex-1 flex justify-center">
        <Button as="link" to={`/articles/${data._id}`} variant="terciary">
          <MessageSquare />
          <span>{data.commentsCount}</span>
        </Button>
      </div>
      <div className="flex-1 flex justify-center">
        <Button variant="terciary" onClick={handleClickRepost}>
          <Repeat2 className={repostClasses} />
          <span>{data.reposts.length}</span>
        </Button>
      </div>
      <div className="flex-1 flex justify-center">
        <Button variant="terciary" onClick={handleClickBookmark}>
          <Bookmark className={bookmarkClasses} />
          <span>{data.bookmarks.length}</span>
        </Button>
      </div>
    </div>
  );
};

export default ArticleItemActions;
