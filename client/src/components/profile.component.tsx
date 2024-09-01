import { ArrowLeft, PenLine } from "lucide-react";
import { Button } from "../common/ui";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useGetOneUserQuery } from "../api/users/users.api";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetOneUserQuery(userId as string);

  const handleClickBack = () => navigate(-1);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error.</span>;
  }

  const isCurrentUserProfile = userId === user.userId;

  return (
    <div className="mb-12">
      <div className="bg-blue-50 h-cover">
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
            <div className="w-[90px] h-[90px] bg-slate-600 rounded-full" />
            <h2 className="text-xl text-primary-200 font-bold">
              {data?.firstName} {data?.secondName}
            </h2>
          </div>
          <div className="flex items-center gap-7">
            <Button variant="secondary" className="rounded-3xl">
              Follow
            </Button>
            {isCurrentUserProfile && (
              <Link
                className="px-4 py-2.5 inline-flex items-center gap-3.5 bg-labelFill text-base text-primary-200 border border-primary-200 rounded-3xl"
                to={`/${data?._id}/profile/edit`}
              >
                <PenLine size={20} />
                Edit Profile
              </Link>
            )}
          </div>
        </div>
        {data?.bio && <p className="mb-10">{data?.bio}</p>}
        <div>
          <Link
            className="mr-7 text-secondary-300 text-lg"
            to={`/${data?._id}/followers`}
          >
            <span className="text-primary-200 font-medium">
              {data?.followers.length || 0}
            </span>{" "}
            followers
          </Link>
          <Link
            className="mr-7 text-secondary-300 text-lg"
            to={`/${data?._id}/followings`}
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
