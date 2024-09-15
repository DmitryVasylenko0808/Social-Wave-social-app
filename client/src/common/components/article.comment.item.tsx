import { EllipsisVertical, PenLine, Trash2 } from "lucide-react";
import { userAvatarsUrl } from "../../api/constants";
import { Button, Menu, MenuItem } from "../ui";
import Avatar from "../ui/avatar.component";
import { Link } from "react-router-dom";
import { Comment } from "../../api/articles/dto/get.comments.dto";
import { useAuth } from "../../hooks/useAuth";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useDeleteCommentMutation } from "../../api/articles/comments.api";
import { useModal } from "../../hooks/useModal";
import EditCommentModal from "./edit.comment.modal";

type ArticleCommentItemProps = {
  data: Comment;
};

const ArticleCommentItem = ({ data }: ArticleCommentItemProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { user } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const editModal = useModal();
  const [triggerDeleteComment] = useDeleteCommentMutation();

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickOpenMenu = () => setOpenMenu(true);
  const handleClickEdit = () => editModal.onOpen();

  const handleClickDelete = () => {
    triggerDeleteComment({ articleId: data.article, commentId: data._id })
      .unwrap()
      .catch((err) => alert(err.data.message));
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
              className="text-secondary-300 font-medium"
            >
              {data.author.firstName} {data.author.secondName}
            </Link>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-secondary-100">
            {data.createdAt.toString()}
          </span>

          {isUserCommnent && (
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
      <p>{data.text}</p>

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

export default ArticleCommentItem;
