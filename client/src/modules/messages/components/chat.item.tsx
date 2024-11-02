import { userAvatarsUrl } from "../../../core/constants";
import { cn } from "../../../utils/cn";
import { useAuth } from "../../auth/hooks/useAuth";
import { Avatar } from "../../common/ui";
import { Chat } from "../api/dto/get.chats.dto";

type ChatItemProps = {
  chat: Chat;
  active: boolean;
  onSelect: () => void;
};

const ChatItem = ({ chat, active, onSelect }: ChatItemProps) => {
  const { user } = useAuth();

  const participant = chat.members.find((m) => m._id !== user.userId);
  const participantAvatarSrc = participant?.avatar
    ? `${userAvatarsUrl}/${participant.avatar}`
    : `${userAvatarsUrl}/nullavatar.jpg`;

  const classes = cn(
    "p-4 flex items-center gap-5 cursor-pointer hover:bg-primary-100/20",
    { "bg-primary-100/20": active === true }
  );

  return (
    <div className={classes} onClick={onSelect}>
      <Avatar variant="medium" src={participantAvatarSrc} />
      <span className="text-secondary-300 font-medium dark:text-white">
        {participant?.firstName} {participant?.secondName}
      </span>
    </div>
  );
};

export default ChatItem;
