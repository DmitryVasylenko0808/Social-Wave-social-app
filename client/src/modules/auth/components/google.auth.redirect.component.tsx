import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";

const GoogleAuthRedirect = () => {
  const [params] = useSearchParams();
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token") as string;
    authenticate(token);
    navigate("/");
  }, []);

  return <div className="dark:text-secondary-100">Google Logging In...</div>;
};

export default GoogleAuthRedirect;
