import { useRef, useState } from "react";
import { userAvatarsUrl } from "../../../api/constants";
import { useAuth } from "../../../hooks/useAuth";
import { useModal } from "../../../hooks/useModal";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { EllipsisVertical, PenLine, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { Avatar, Button, Menu, MenuItem } from "../../ui";
import { ArticleItemProps } from "./article.item.component";
import { DeleteArticleModal, EditArticleModal } from "..";

type ArticleItemHeaderProps = ArticleItemProps;

const ArticleItemHeader = ({
  data,
  reposted,
  deleteAfter,
}: ArticleItemHeaderProps) => {
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const deleteModal = useModal();
  const editModal = useModal();
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickOpenMenu = () => setOpenMenu(true);
  const handleClickEdit = () => editModal.onOpen();
  const handleClickDelete = () => deleteModal.onOpen();

  const isUserArticle = data.author._id === user.userId;

  return (
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
              className="text-secondary-100 underline"
            >
              reposted article
            </Link>
          )}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-secondary-100">
          <ReactTimeAgo date={new Date(data.createdAt)} timeStyle="twitter" />
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
          deleteAfter={deleteAfter}
        />
      )}
    </div>
  );
};

export default ArticleItemHeader;
