import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { CommentItemProps } from "./comment.item";
import { EllipsisVertical, PenLine, Trash2 } from "lucide-react";
import { Avatar, Button, Menu, MenuItem } from "../../ui";
import { userAvatarsUrl } from "../../../api/constants";
import { useState, useRef } from "react";
import { useDeleteCommentMutation } from "../../../api/articles/comments.api";
import { useAlerts } from "../../../hooks/useAlerts";
import { useAuth } from "../../../hooks/useAuth";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useModal } from "../../../hooks/useModal";
import { EditCommentModal } from "..";
import { useTranslation } from "react-i18next";

type CommentItemHeaderProps = CommentItemProps;

const CommentItemHeader = ({ data }: CommentItemHeaderProps) => {
  const { t } = useTranslation();
  const alerts = useAlerts();
  const { user } = useAuth();
  const editModal = useModal();
  const ref = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [triggerDeleteComment] = useDeleteCommentMutation();

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickOpenMenu = () => setOpenMenu(true);
  const handleClickEdit = () => editModal.onOpen();

  const handleClickDelete = () => {
    triggerDeleteComment({ articleId: data.article, commentId: data._id })
      .unwrap()
      .catch((err) => {
        alerts.error(`${t("error")}: ${err.data.message}`);
      });
  };

  const isUserCommnent = data.author._id === user.userId;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to={`/users/${data.author._id}/profile`}>
            <Avatar
              variant="small"
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
            </Link>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-secondary-100">
            <ReactTimeAgo date={new Date(data.createdAt)} timeStyle="twitter" />
          </span>

          {isUserCommnent && (
            <div className="relative">
              <Button variant="terciary" onClick={handleClickOpenMenu}>
                <EllipsisVertical />
              </Button>

              <Menu open={openMenu} ref={ref}>
                <MenuItem onClick={handleClickEdit}>
                  <PenLine size={18} /> {t("comment.menu.edit")}
                </MenuItem>
                <MenuItem
                  className="text-red-600 dark:text-red-600"
                  onClick={handleClickDelete}
                >
                  <Trash2 size={18} />
                  {t("comment.menu.delete")}
                </MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </div>
      {data && (
        <EditCommentModal
          comment={data}
          open={editModal.open}
          onClose={editModal.onClose}
        />
      )}
    </div>
  );
};

export default CommentItemHeader;
