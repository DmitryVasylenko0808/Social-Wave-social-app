import { useRef, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useClickOutside } from "../../common/hooks/useClickOutside";
import { Chat } from "../api/dto/get.chats.dto";
import { Button, Menu, MenuItem } from "../../common/ui";
import { ArrowLeft, EllipsisVertical, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

type MessagesHeaderProps = {
  chat: Chat;
  onLeaveChat: () => void;
  onDeleteChat: () => void;
};

const MessagesHeader = ({
  chat,
  onLeaveChat,
  onDeleteChat,
}: MessagesHeaderProps) => {
  const { user } = useAuth();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useClickOutside(menuRef, () => setOpenMenu(false));

  const handleClickMenu = () => setOpenMenu(true);

  const participant = chat.members.find((m) => m._id !== user.userId);

  return (
    <div className="min-h-16 px-4 flex justify-between items-center shadow-sm border-b border-secondary-50 dark:border-dark-200">
      <div className="flex items-center gap-4">
        <Button onClick={onLeaveChat} variant="tertiary">
          <ArrowLeft />
        </Button>
        <h3 className="text-lg font-bold dark:text-white">
          {participant?.firstName} {participant?.secondName}
        </h3>
      </div>
      <div className="relative">
        <Button variant="tertiary" onClick={handleClickMenu}>
          <EllipsisVertical />
        </Button>
        <Menu open={openMenu} ref={menuRef}>
          <MenuItem onClick={onDeleteChat}>
            <Trash2 /> {t("messages.menu.deleteChat")}
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default MessagesHeader;
