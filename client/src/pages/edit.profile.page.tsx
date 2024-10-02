import { useAuth } from "../hooks/useAuth";
import { Navigate, useParams } from "react-router";
import { EditProfileForm } from "../modules/users/components";

const EditProfilePage = () => {
  const { userId } = useParams();
  const { user } = useAuth();

  if (userId !== user.userId) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <EditProfileForm />
    </>
  );
};

export default EditProfilePage;
