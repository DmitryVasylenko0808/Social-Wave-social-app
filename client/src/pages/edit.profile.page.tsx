import { Navigate, useParams } from "react-router";
import { EditProfileForm } from "../components";
import { useAuth } from "../hooks/useAuth";

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
