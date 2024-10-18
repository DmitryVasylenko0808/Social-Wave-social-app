import { useToggleLikeArticleMutation } from "../../../../api/articles/articles.api";
import { useToggleBookmarkArticleMutation } from "../../../../api/articles/bookmarked.article.api";
import { useAlerts } from "../../../../hooks/useAlerts";
import { useAuth } from "../../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Heart, MessageSquare, Bookmark } from "lucide-react";
import { Button } from "../../../common/ui";
import { ArticleItemProps } from "./article.item.component";
import { cn } from "../../../../utils/cn";
import ArticleMenuRepost from "./article.menu.repost";
import { Link, useLocation, useNavigate } from "react-router-dom";

type ArticleItemActionsProps = ArticleItemProps;

const ArticleItemActions = ({ data }: ArticleItemActionsProps) => {
  const location = useLocation();
  const alerts = useAlerts();
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [triggerToggleLikeArticle] = useToggleLikeArticleMutation();
  const [triggerToggleBookmarkArticle] = useToggleBookmarkArticleMutation();

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

  const handleClickComments = () => {
    navigate(`/article/${data._id}`, {
      state: { backgroundLocation: location },
    });
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
  const bookmarkClasses = cn("", {
    "fill-secondary-100 hover:fill-secondary-200": isBookmarked === true,
  });

  return (
    <div className="flex justify-between">
      <div className="flex gap-8">
        <Button
          className="text-sm gap-2"
          variant="terciary"
          onClick={handleClickLike}
        >
          <Heart size={22} className={heartClasses} />
          <span>{data.likes.length}</span>
        </Button>
        <ArticleMenuRepost
          article={data}
          reposts={data.reposts}
          disabled={isReposted}
        />
        <Button
          className="text-sm gap-2"
          variant="terciary"
          onClick={handleClickComments}
        >
          <MessageSquare size={22} />
          <span>{data.commentsCount}</span>
        </Button>
      </div>
      <div className="">
        <Button
          className="text-sm gap-2"
          variant="terciary"
          onClick={handleClickBookmark}
        >
          <Bookmark size={22} className={bookmarkClasses} />
          <span>{data.bookmarks.length}</span>
        </Button>
      </div>
    </div>
  );
};

export default ArticleItemActions;
