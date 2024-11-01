import { userAvatarsUrl } from "../../../core/constants";
import { Avatar } from "../../common/ui";

const ChatItem = () => {
  return (
    <div className="flex items-center gap-5">
      <Avatar variant="medium" src={`${userAvatarsUrl}/nullavatar.jpg`} />
      <span className="text-secondary-300 font-medium dark:text-white">
        Lorem Ipsum
      </span>
    </div>
  );
};

export default ChatItem;
