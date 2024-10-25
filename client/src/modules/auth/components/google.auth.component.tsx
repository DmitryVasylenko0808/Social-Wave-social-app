import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { apiUrl } from "../../../core/constants";
import { Button } from "../../common/ui";
import GoogleIcon from "../icons/google.icon.svg";
import { useTranslation } from "react-i18next";

const GoogleAuth = () => {
  const [params] = useSearchParams();
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (params.get("token")) {
      const token = params.get("token") as string;

      authenticate(token);
      navigate("/");
    }
  }, []);

  const handleClickGoogleLogin = () => {
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div className="mb-5">
      <div className="mb-5 flex items-center">
        <div className="flex-1 h-[1px] bg-secondary-100" />
        <span className="mx-3 text-secondary-100">{t("signIn.or")}</span>
        <div className="flex-1 h-[1px] bg-secondary-100" />
      </div>

      <Button
        type="button"
        variant="terciary"
        className="w-full border border-secondary-100 rounded-3xl hover:bg-secondary-50 dark:hover:bg-dark-200"
        onClick={handleClickGoogleLogin}
      >
        <GoogleIcon />
        {t("signIn.googleAuthBtn")}
      </Button>
    </div>
  );
};

export default GoogleAuth;
