import {
  useRepostArticleMutation,
  useToggleLikeArticleMutation,
} from "../../api/articles/articles.api";
import { useAuth } from "../../hooks/useAuth";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useModal } from "../../hooks/useModal";
import { useToggleBookmarkArticleMutation } from "../../api/articles/bookmarked.article.api";
import {
  Heart,
  MessageSquare,
  Repeat2,
  Bookmark,
  EllipsisVertical,
  PenLine,
  Trash2,
} from "lucide-react";
import { Button, Menu, MenuItem, Avatar } from "../ui";
import { Link } from "react-router-dom";
import DeleteArticleModal from "./delete.article.modal";
import EditArticleModal from "./edit.article.modal";
import { Article } from "../../api/articles/dto/get.articles.dto";
import { articlesImgUrl, userAvatarsUrl } from "../../api/constants";
import { cn } from "../../utils/cn";

type ArticleItemProps = {
  data: Article;
  reposted?: boolean;
};

const ArticleItem = ({ data, reposted }: ArticleItemProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const deleteModal = useModal();
  const editModal = useModal();
  const { user } = useAuth();
  const [triggerToggleLikeArticle] = useToggleLikeArticleMutation();
  const [triggerToggleBookmarkArticle] = useToggleBookmarkArticleMutation();
  const [triggerRepostArticle] = useRepostArticleMutation();

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickOpenMenu = () => setOpenMenu(true);
  const handleClickEdit = () => editModal.onOpen();
  const handleClickDelete = () => deleteModal.onOpen();

  const handleClickLike = () => {
    triggerToggleLikeArticle({
      id: data._id,
      isLiked,
    });
  };

  const handleClickRepost = () => {
    if (!isReposted) {
      triggerRepostArticle(data._id)
        .unwrap()
        .then(() => alert("The article has been successfully reposted"))
        .catch((err) => alert(err.data.message));
    }
  };

  const handleClickBookmark = () => {
    triggerToggleBookmarkArticle({
      id: data._id,
      isBookmarked,
    });
  };

  const isUserArticle = data.author._id === user.userId;
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
    <article>
      <div className="mb-4 flex justify-between items-center">
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
              className="text-secondary-300 font-medium"
            >
              {data.author.firstName} {data.author.secondName}
            </Link>{" "}
            {data.repostedArticle && (
              <Link
                to={`/articles/${data.repostedArticle._id}`}
                className="text-secondary-100 hover:underline"
              >
                reposted article
              </Link>
            )}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-secondary-100">
            {data.createdAt.toString()}
          </span>

          {isUserArticle && !reposted && (
            <div className="relative">
              <Button variant="terciary" onClick={handleClickOpenMenu}>
                <EllipsisVertical />
              </Button>

              <Menu open={openMenu} ref={ref}>
                <MenuItem onClick={handleClickEdit}>
                  <PenLine size={18} /> Edit
                </MenuItem>
                <MenuItem className="text-red-600" onClick={handleClickDelete}>
                  <Trash2 size={18} />
                  Delete
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </div>
      <p className="mb-1">{data?.text}</p>
      {data.images && (
        <div className="py-4 flex flex-wrap gap-7">
          {data.images.map((image, index) => (
            <img
              className="max-w-52 max-h-52 rounded-xl"
              src={`${articlesImgUrl}/${image}`}
              alt={`image ${index}`}
              key={index}
            />
          ))}
        </div>
      )}
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

      {data && (
        <EditArticleModal
          article={data}
          open={editModal.open}
          onClose={editModal.onClose}
        />
      )}
      {data && (
        <DeleteArticleModal
          article={data}
          open={deleteModal.open}
          onClose={deleteModal.onClose}
        />
      )}
    </article>
  );
};

export default ArticleItem;
