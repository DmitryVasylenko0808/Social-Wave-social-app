import { CommentItemProps } from "./comment.item";

type CommentItemBodyProps = CommentItemProps;

const CommentItemBody = ({ data }: CommentItemBodyProps) => {
  return <p className="dark:text-secondary-100">{data.text}</p>;
};

export default CommentItemBody;
