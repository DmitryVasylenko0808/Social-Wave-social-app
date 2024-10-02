import { useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { CreateArticleForm, UserFeed } from "../modules/articles/components";
import { Profile } from "../modules/users/components";

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
