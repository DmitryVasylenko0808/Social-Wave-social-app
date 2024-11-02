import { useState } from "react";
import { cn } from "../../../utils/cn";
import { Message } from "../api/dto/get.messages.dto";

type MessageItemProps = {
  message: Message;
  selected: boolean;
  variant: "user" | "other";

  onClick?: () => void;
};

const MessageItem = ({
  message,
  selected,
  variant,
  onClick,
}: MessageItemProps) => {
  const containerClasses = cn("relative w-full py-3 flex", {
    "flex-row-reverse": variant === "user",
    "bg-primary-100/20": selected === true,
  });

  const messageClasses = cn("py-3 px-4 max-w-[90%] rounded-2xl", {
    "ml-4 bg-secondary-50 rounded-bl-none": variant === "other",
    "mr-4 bg-primary-200 text-white rounded-br-none cursor-pointer":
      variant === "user",
  });

  const dateClasses = cn("text-right text-sm", {
    "text-secondary-50": variant === "user",
    "text-label": variant === "other",
  });

  return (
    <div className={containerClasses}>
      <div className={messageClasses} onClick={onClick}>
        <p className="">{message.content}</p>
        <p className={dateClasses}>
          {new Date(message.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
