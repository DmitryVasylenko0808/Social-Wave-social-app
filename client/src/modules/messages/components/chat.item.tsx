import { userAvatarsUrl } from "../../../core/constants";
import { Avatar } from "../../common/ui";

const ChatItem = () => {
  return (
    <div className="p-4 flex items-center gap-5 cursor-pointer hover:bg-primary-100/20">
      <Avatar variant="medium" src={`${userAvatarsUrl}/nullavatar.jpg`} />
      <span className="text-secondary-300 font-medium dark:text-white">
        Lorem Ipsum
      </span>
    </div>
  );
};

export default ChatItem;
