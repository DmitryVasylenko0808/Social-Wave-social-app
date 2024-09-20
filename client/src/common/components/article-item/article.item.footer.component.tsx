import {
  useToggleLikeArticleMutation,
  useRepostArticleMutation,
} from "../../../api/articles/articles.api";
import { useToggleBookmarkArticleMutation } from "../../../api/articles/bookmarked.article.api";
import { useAlerts } from "../../../hooks/useAlerts";
import { useAuth } from "../../../hooks/useAuth";
import ArticleItem, { ArticleItemProps } from "./article.item.component";
import { Heart, MessageSquare, Repeat2, Bookmark } from "lucide-react";
import { Button } from "../../ui";
import { cn } from "../../../utils/cn";

type ArticleItemFooterProps = Pick<ArticleItemProps, "data">;

const ArticleItemFooter = ({ data }: ArticleItemFooterProps) => {
  const { user } = useAuth();
  const [triggerToggleLikeArticle] = useToggleLikeArticleMutation();
  const [triggerToggleBookmarkArticle] = useToggleBookmarkArticleMutation();
  const [triggerRepostArticle] = useRepostArticleMutation();
  const alerts = useAlerts();

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
        .then(() =>
          alerts.success("The article has been successfully reposted")
        )
        .catch((err) => {
          alerts.error(`Oops... something went wrong: ${err.data.message}`);
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
        alerts.error(`Oops... something went wrong: ${err.data.message}`);
      });
  };

  const isLiked = data.likes.includes(user.userId as string);
  const isReposted = data.reposts.includes(user.userId as string);
  const isBookmarked = data.bookmarks.includes(user.userId as string);

  const heartClasses = cn("", {
    "fill-red-500 text-red-500": isLiked === true,
  });
  const repostClasses = cn("", {
    "text-primary-200": isReposted === true,
  });
  const bookmarkClasses = cn("", {
    "fill-secondary-100 hover:fill-secondary-200": isBookmarked === true,
  });

  return (
    <div>
      {data.repostedArticle ? (
        <div className="px-6 py-3 border-2 border-secondary-50">
          <ArticleItem
            data={data.repostedArticle}
            reposted={!!data.repostedArticle}
          />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default ArticleItemFooter;
