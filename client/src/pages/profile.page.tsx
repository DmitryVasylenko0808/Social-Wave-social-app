import { useParams } from "react-router";
import { CreateArticleForm, UserFeed } from "../components";
import Profile from "../components/profile.component";
import { useAuth } from "../hooks/useAuth";

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
