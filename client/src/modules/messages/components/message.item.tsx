import { cn } from "../../../utils/cn";
import { Message } from "../api/dto/get.messages.dto";

type MessageItemProps = {
  message: Message;
  variant: "user" | "other";
};

const MessageItem = ({ message, variant }: MessageItemProps) => {
  const containerClasses = cn("relative w-full flex", {
    "flex-row-reverse": variant === "user",
  });

  const messageClasses = cn("py-3 px-4 max-w-[90%] rounded-2xl", {
    "bg-secondary-50 rounded-bl-none": variant === "other",
    "bg-primary-200 text-white rounded-br-none": variant === "user",
  });

  const dateClasses = cn("text-right text-sm", {
    "text-secondary-50": variant === "user",
    "text-label": variant === "other",
  });

  return (
    <div className={containerClasses}>
      <div className={messageClasses}>
        <p className="">{message.content}</p>
        <p className={dateClasses}>
          {new Date(message.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
