import { cn } from "../../../utils/cn";

type MessageItemProps = {
  variant: "user" | "other";
};

const MessageItem = ({ variant }: MessageItemProps) => {
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
        <p className="">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo,
          quod dignissimos earum impedit, illo placeat quaerat aliquam
          voluptatibus corporis et aperiam sapiente officiis odit veritatis
          tempora! Dolorem cum ad sit.
        </p>
        <p className={dateClasses}>20.03.2020</p>
      </div>
    </div>
  );
};

export default MessageItem;
