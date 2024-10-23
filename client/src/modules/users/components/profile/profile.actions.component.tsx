import { useAlerts } from "../../../common/hooks/useAlerts";
import { useAuth } from "../../../auth/hooks/useAuth";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../api/users.api";
import { PenLine } from "lucide-react";
import { Button } from "../../../common/ui";
import { UserDetails } from "../../api/dto/get.one.user.dto";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ProfileActionsProps = {
  data?: UserDetails;
  userId?: string;
};

const ProfileActions = ({ data, userId }: ProfileActionsProps) => {
  const alerts = useAlerts();
  const { t } = useTranslation();
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
            <Button variant="secondary" onClick={handleClickFollow}>
              {t("profile.actions.followBtn")}
            </Button>
          ) : (
            <Button variant="remove" onClick={handleClickUnfollow}>
              {t("profile.actions.unfollowBtn")}
            </Button>
          )}
        </>
      )}
      {isCurrentUserProfile && (
        <Link
          className="px-4 py-2.5 inline-flex items-center gap-3.5 bg-labelFill text-base font-bold text-primary-200 border border-primary-200 rounded-3xl dark:bg-dark-200"
          to={`/users/${data?._id}/edit`}
        >
          <PenLine size={20} />
          {t("profile.actions.editBtn")}
        </Link>
      )}
    </div>
  );
};

export default ProfileActions;
