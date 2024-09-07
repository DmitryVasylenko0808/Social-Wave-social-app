import { CreateArticleForm, UserFeed } from "../components";
import Profile from "../components/profile.component";

const ProfilePage = () => {
  return (
    <>
      <Profile />
      <CreateArticleForm />
      <UserFeed />
    </>
  );
};

export default ProfilePage;
