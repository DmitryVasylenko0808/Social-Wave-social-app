import { Navigate, useParams } from "react-router";
import { useGetOneUserQuery } from "../../api/users/users.api";
import { UserProfileSkeleton } from "../../common/components";
import ProfileBackground from "./profile.background.component";
import ProfileInfo from "./profile.info.component";
import ProfileActions from "./profile.actions.component";
import ProfileBio from "./profile.bio.component";
import ProfileStats from "./profile.stats.component";

const Profile = () => {
  const { userId } = useParams();
  const { data, isLoading, isError } = useGetOneUserQuery(userId as string);

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (isError) {
    return <Navigate to="*" replace />;
  }

  return (
    <div className="mb-12">
      <ProfileBackground data={data} />
      <div className="px-6">
        <div className="relative bottom-12 flex items-center justify-between">
          <ProfileInfo data={data} />
          <ProfileActions data={data} userId={userId} />
        </div>
        <ProfileBio data={data} />
        <ProfileStats data={data} />
      </div>
    </div>
  );
};

export default Profile;
