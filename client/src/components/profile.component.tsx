import { ArrowLeft, PenLine } from "lucide-react";
import { Button } from "../common/ui";
import { Navigate, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  useFollowUserMutation,
  useGetOneUserQuery,
  useUnfollowUserMutation,
} from "../api/users/users.api";
import { userAvatarsUrl } from "../api/constants";
import Avatar from "../common/ui/avatar.component";
import { UserProfileSkeleton } from "../common/components";
import { useAlerts } from "../hooks/useAlerts";

const Profile = () => {
  const alerts = useAlerts();
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetOneUserQuery(userId as string);
  const [triggerFollowUser] = useFollowUserMutation();
  const [triggerUnfollowUser] = useUnfollowUserMutation();

  const handleClickBack = () => navigate(-1);

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

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (isError) {
    return <Navigate to="*" replace />;
  }

  const isCurrentUserProfile = userId === user.userId;
  const isFollowed = data?.followers.includes(user.userId as string);

  return (
    <div className="mb-12">
      <div
        style={{
          backgroundImage: `url(${userAvatarsUrl}/${data!.coverImage})`,
        }}
        className="h-cover bg-blue-50 bg-cover bg-center"
      >
        <div className="pt-2 px-6">
          <div className="flex items-center gap-3.5">
            <Button variant="terciary" onClick={handleClickBack}>
              <ArrowLeft />
            </Button>
            <h2 className="text-xl text-primary-200 font-bold">
              {data?.firstName} {data?.secondName}
            </h2>
          </div>
        </div>
      </div>
      <div className="px-6">
        <div className="relative bottom-12 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Avatar
              className="border-4 border-white"
              variant="big"
              src={
                data?.avatar
                  ? `${userAvatarsUrl}/${data.avatar}`
                  : `${userAvatarsUrl}/nullavatar.jpg`
              }
              alt={`Avatar ${data?.firstName} ${data?.secondName}`}
            />
            <h2 className="pt-5 text-xl text-primary-200 font-bold">
              {data?.firstName} {data?.secondName}
            </h2>
          </div>
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
        </div>
        {data?.bio && <p className="mb-10">{data?.bio}</p>}
        <div className="flex gap-7">
          <Link
            to={`/users/${data?._id}/followers`}
            className="px-2 text-secondary-300 text-lg inline-flex gap-2"
          >
            <span className="text-primary-200 font-medium">
              {data?.followers.length || 0}
            </span>{" "}
            followers
          </Link>
          <Link
            to={`/users/${data?._id}/followings`}
            className="px-2 text-secondary-300 text-lg inline-flex gap-2"
          >
            <span className="text-primary-200 font-medium">
              {data?.followings.length || 0}
            </span>{" "}
            followings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
