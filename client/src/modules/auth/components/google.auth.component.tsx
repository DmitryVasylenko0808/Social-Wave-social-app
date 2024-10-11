import { apiUrl } from "../../../api/constants";
import { Button } from "../../common/ui";

const GoogleAuth = () => {
  const handleClickGoogleLogin = () => {
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div className="mb-5">
      <div className="mb-5 flex items-center">
        <div className="flex-1 h-0.5 bg-secondary-100" />
        <span className="mx-3 text-secondary-100">or</span>
        <div className="flex-1 h-0.5 bg-secondary-100" />
      </div>

      <Button
        type="button"
        variant="terciary"
        className="w-full border border-secondary-100 rounded-3xl"
        onClick={handleClickGoogleLogin}
      >
        Sign In with Google
      </Button>
    </div>
  );
};

export default GoogleAuth;
