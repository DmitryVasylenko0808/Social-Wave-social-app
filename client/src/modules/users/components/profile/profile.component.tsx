import { Navigate, useParams } from "react-router";
import { useGetOneUserQuery } from "../../api/users.api";
import ProfileBackground from "./profile.background.component";
import ProfileInfo from "./profile.info.component";
import ProfileActions from "./profile.actions.component";
import ProfileBio from "./profile.bio.component";
import ProfileStats from "./profile.stats.component";
import { UserProfileSkeleton } from "..";

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
        <div className="relative bottom-12 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-5">
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
