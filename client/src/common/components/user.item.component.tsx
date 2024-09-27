import { User } from "../../api/users/dto/get.users.dto";
import { Link } from "react-router-dom";
import { userAvatarsUrl } from "../../api/constants";
import Avatar from "../ui/avatar.component";

type UserItemProps = {
  data: User;
};

const UserItem = ({ data }: UserItemProps) => {
  return (
    <div className="py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to={`/users/${data._id}/profile`}>
          <Avatar
            variant="medium"
            src={
              data?.avatar
                ? `${userAvatarsUrl}/${data?.avatar}`
                : `${userAvatarsUrl}/nullavatar.jpg`
            }
            alt={`Avatar ${data?.firstName} ${data?.secondName}`}
          />
        </Link>
        <Link to={`/users/${data._id}/profile`}>
          <span className="text-secondary-300 font-medium dark:text-white">
            {data.firstName} {data.secondName}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
