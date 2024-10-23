import { useParams } from "react-router";
import { useAuth } from "../modules/auth/hooks/useAuth";
import {
  CreateArticleForm,
  MixedFeed,
  UserFeed,
} from "../modules/articles/components";
import { Profile } from "../modules/users/components";

const ProfilePage = () => {
  const { userId } = useParams();
  const { user } = useAuth();

  const isUserProfile = userId === user.userId;

  return (
    <>
      <Profile />
      {isUserProfile && <CreateArticleForm />}
      {isUserProfile ? <MixedFeed /> : <UserFeed />}
    </>
  );
};

export default ProfilePage;
