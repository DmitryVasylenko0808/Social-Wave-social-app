import { CommentItemProps } from "./comment.item";

type CommentItemBodyProps = CommentItemProps;

const CommentItemBody = ({ data }: CommentItemBodyProps) => {
  return <p>{data.text}</p>;
};

export default CommentItemBody;
