import { useAlerts } from "../../hooks/useAlerts";
import { useAuth } from "../../hooks/useAuth";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../api/users/users.api";
import { PenLine } from "lucide-react";
import { Button } from "../../common/ui";
import { UserDetails } from "../../api/users/dto/get.one.user.dto";
import { Link } from "react-router-dom";

type ProfileActionsProps = {
  data?: UserDetails;
  userId?: string;
};

const ProfileActions = ({ data, userId }: ProfileActionsProps) => {
  const alerts = useAlerts();
  const { user } = useAuth();
  const [triggerFollowUser] = useFollowUserMutation();
  const [triggerUnfollowUser] = useUnfollowUserMutation();

  const handleClickFollow = () => {
    triggerFollowUser(userId as string)
      .unwrap()
      .catch((err) => {
        alerts.error(`Oops... something went wrong: ${err.data.message}`);
      });
  };

  const handleClickUnfollow = () => {
    triggerUnfollowUser(userId as string)
      .unwrap()
      .catch((err) => {
        alerts.error(`Oops... something went wrong: ${err.data.message}`);
      });
  };

  const isCurrentUserProfile = userId === user.userId;
  const isFollowed = data?.followers.includes(user.userId as string);

  return (
    <div className="flex items-center gap-7">
      {!isCurrentUserProfile && (
        <>
          {!isFollowed ? (
            <Button
              variant="secondary"
              className="rounded-3xl"
              onClick={handleClickFollow}
            >
              Follow
            </Button>
          ) : (
            <Button
              variant="remove"
              className="rounded-3xl"
              onClick={handleClickUnfollow}
            >
              Unfollow
            </Button>
          )}
        </>
      )}
      {isCurrentUserProfile && (
        <Link
          className="px-4 py-2.5 inline-flex items-center gap-3.5 bg-labelFill text-base text-primary-200 border border-primary-200 rounded-3xl"
          to={`/users/${data?._id}/edit`}
        >
          <PenLine size={20} />
          Edit Profile
        </Link>
      )}
    </div>
  );
};

export default ProfileActions;
