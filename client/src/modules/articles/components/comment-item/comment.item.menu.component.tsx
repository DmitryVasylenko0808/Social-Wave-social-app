import { useRef, useState } from "react";
import { useDeleteCommentMutation } from "../../api/comments.api";
import { useAlerts } from "../../../common/hooks/useAlerts";
import { useClickOutside } from "../../../common/hooks/useClickOutside";
import { useModal } from "../../../common/hooks/useModal";
import { EllipsisVertical, PenLine, Trash2 } from "lucide-react";
import { Button, Menu, MenuItem } from "../../../common/ui";
import { CommentItemProps } from "./comment.item";
import { EditCommentModal } from "..";
import { useTranslation } from "react-i18next";

type CommentItemMenuProps = CommentItemProps;

const CommentItemMenu = ({ data }: CommentItemMenuProps) => {
  const alerts = useAlerts();
  const editModal = useModal();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [triggerDeleteComment] = useDeleteCommentMutation();
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickOpenMenu = () => setOpenMenu(true);
  const handleClickEdit = () => editModal.onOpen();

  const handleClickDelete = () => {
    triggerDeleteComment({ articleId: data.article, commentId: data._id })
      .unwrap()
      .catch((err: { data: { message: any } }) => {
        alerts.error(`${t("error")}: ${err.data.message}`);
      });
  };
  return (
    <>
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
      {data && (
        <EditCommentModal
          comment={data}
          open={editModal.open}
          onClose={editModal.onClose}
        />
      )}
    </>
  );
};

export default CommentItemMenu;
