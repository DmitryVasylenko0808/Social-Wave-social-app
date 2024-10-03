import { PropsWithChildren } from "react";

type CommentItemHeaderProps = PropsWithChildren;

const CommentItemHeader = ({ children }: CommentItemHeaderProps) => {
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">{children}</div>
    </div>
  );
};

export default CommentItemHeader;
