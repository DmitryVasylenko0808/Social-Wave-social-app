import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { useClickOutside } from "../../../common/hooks/useClickOutside";
import { useModal } from "../../../common/hooks/useModal";
import { EllipsisVertical, PenLine, Trash2 } from "lucide-react";
import { Button, Menu, MenuItem } from "../../../common/ui";
import { DeleteArticleModal, EditArticleModal } from "..";
import { ArticleItemProps } from "./article.item.component";

type ArticleItemMenuProps = ArticleItemProps;

const ArticleItemMenu = ({ data, deleteAfter }: ArticleItemMenuProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { t } = useTranslation();
  const deleteModal = useModal();
  const editModal = useModal();
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickOpenMenu = () => setOpenMenu(true);
  const handleClickEdit = () => editModal.onOpen();
  const handleClickDelete = () => deleteModal.onOpen();

  return (
    <>
      <div className="relative">
        <Button variant="terciary" onClick={handleClickOpenMenu}>
          <EllipsisVertical />
        </Button>

        <Menu open={openMenu} ref={ref}>
          <MenuItem onClick={handleClickEdit}>
            <PenLine size={18} /> {t("article.menu.edit")}
          </MenuItem>
          <MenuItem
            className="text-red-600 dark:text-red-600"
            onClick={handleClickDelete}
          >
            <Trash2 size={18} />
            {t("article.menu.delete")}
          </MenuItem>
        </Menu>
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
    </>
  );
};

export default ArticleItemMenu;
