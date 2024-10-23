import { Author } from "../../api//dto/get.articles.dto";
import { Link } from "react-router-dom";
import { Avatar } from "../../../common/ui";
import { userAvatarsUrl } from "../../../../core/constants";

type CommentItemAuthorProps = {
  author: Author;
};

const CommentItemAuthor = ({ author }: CommentItemAuthorProps) => {
  return (
    <div className="flex items-center gap-4">
      <Link to={`/users/${author._id}/profile`}>
        <Avatar
          variant="small"
          src={
            author.avatar
              ? `${userAvatarsUrl}/${author.avatar}`
              : `${userAvatarsUrl}/nullavatar.jpg`
          }
          alt={`Avatar ${author.firstName} ${author.secondName}`}
        />
      </Link>
      <span>
        <Link
          to={`/users/${author._id}/profile`}
          className="text-secondary-300 font-medium dark:text-white"
        >
          {author.firstName} {author.secondName}
        </Link>
      </span>
    </div>
  );
};

export default CommentItemAuthor;
