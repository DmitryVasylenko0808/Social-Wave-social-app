import { memo } from "react";
import Avatar from "../../common/ui/avatar.component";
import { userAvatarsUrl } from "../../../core/constants";
import { User } from "../../users/api/dto/get.users.dto";

type ChatCreateItemProps = {
  user: User;
  onClickCreateChat: () => void;
};

const ChatCreateItem = ({ user, onClickCreateChat }: ChatCreateItemProps) => {
  return (
    <div className="py-2 flex items-center justify-between">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={onClickCreateChat}
      >
        <Avatar
          variant="medium"
          src={
            user?.avatar
              ? `${userAvatarsUrl}/${user?.avatar}`
              : `${userAvatarsUrl}/nullavatar.jpg`
          }
          alt={`Avatar ${user?.firstName} ${user?.secondName}`}
        />
        <span className="text-secondary-300 font-medium dark:text-white">
          {user.firstName} {user.secondName}
        </span>
      </div>
    </div>
  );
};

export default memo(ChatCreateItem);
