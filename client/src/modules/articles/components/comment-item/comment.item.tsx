import { Comment } from "../../../../api/articles/dto/get.comments.dto";
import { useAuth } from "../../../../hooks/useAuth";
import CommentItemAuthor from "./comment.item.author.component";
import CommentItemBody from "./comment.item.body.component";
import CommentItemHeader from "./comment.item.header.component";
import CommentItemMenu from "./comment.item.menu.component";
import CommentItemMeta from "./comment.item.meta.component";

export type CommentItemProps = {
  data: Comment;
};

const CommentItem = ({ data }: CommentItemProps) => {
  const { user } = useAuth();

  const isUserCommnent = data.author._id === user.userId;

  return (
    <div>
      <CommentItemHeader>
        <CommentItemAuthor author={data.author} />
        <CommentItemMeta data={data}>
          {isUserCommnent && <CommentItemMenu data={data} />}
        </CommentItemMeta>
      </CommentItemHeader>
      <CommentItemBody data={data} />
    </div>
  );
};

export default CommentItem;
