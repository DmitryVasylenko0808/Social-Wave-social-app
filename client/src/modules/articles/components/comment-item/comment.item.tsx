import { Comment } from "../../../../api/articles/dto/get.comments.dto";
import CommentItemBody from "./comment.item.body.component";
import CommentItemHeader from "./comment.item.header.component";

export type CommentItemProps = {
  data: Comment;
};

const CommentItem = ({ data }: CommentItemProps) => {
  return (
    <div>
      <CommentItemHeader data={data} />
      <CommentItemBody data={data} />
    </div>
  );
};

export default CommentItem;
