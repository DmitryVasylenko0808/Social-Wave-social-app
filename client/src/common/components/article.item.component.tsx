import {
  Heart,
  MessageSquare,
  Repeat2,
  Bookmark,
  EllipsisVertical,
  PenLine,
  Trash2,
} from "lucide-react";
import { Button, Menu, MenuItem } from "../ui";
import { Article } from "../../api/articles/dto/get.articles.dto";
import { Link } from "react-router-dom";
import {
  useDeleteArticleMutation,
  useLikeArticleMutation,
} from "../../api/articles/articles.api";
import { userAvatarsUrl } from "../../api/constants";
import Avatar from "../ui/avatar.component";
import { useAuth } from "../../hooks/useAuth";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

type ArticleItemProps = {
  data: Article;
};

const ArticleItem = ({ data }: ArticleItemProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [triggerDeleteArticle] = useDeleteArticleMutation();
  const [triggerLikeArticle] = useLikeArticleMutation();

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickOpenMenu = () => setOpenMenu(true);

  const handleClickDelete = async () => {
    await triggerDeleteArticle(data._id).unwrap();
  };

  const handleClickLike = async () => {
    await triggerLikeArticle(data._id).unwrap();
  };

  const isUserArticle = data.author._id === user.userId;

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
          <Link to={`/users/${data.author._id}/profile`}>
            <span className="text-secondary-300 font-medium">
              {data.author.firstName} {data.author.secondName}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-secondary-100">
            {data.createdAt.toString()}
          </span>

          {isUserArticle && (
            <div className="relative">
              <Button variant="terciary" onClick={handleClickOpenMenu}>
                <EllipsisVertical />
              </Button>

              <Menu open={openMenu} ref={ref}>
                <MenuItem>
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
      <div className="flex">
        <div className="flex-1 flex justify-center">
          <Button variant="terciary" onClick={handleClickLike}>
            <Heart />
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
          <Button variant="terciary">
            <Repeat2 />
            <span>{data.reposts.length}</span>
          </Button>
        </div>
        <div className="flex-1 flex justify-center">
          <Button variant="terciary">
            <Bookmark />
            <span>{data.bookmarks.length}</span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ArticleItem;
