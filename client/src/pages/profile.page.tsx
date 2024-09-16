import { useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { CreateArticleForm, Profile, UserFeed } from "../components";

const ProfilePage = () => {
  const { userId } = useParams();
  const { user } = useAuth();

  const isUserProfile = userId === user.userId;

  return (
    <>
      <Profile />
      {isUserProfile && <CreateArticleForm />}
      <UserFeed />
    </>
  );
};

export default ProfilePage;
