import { Trans } from "react-i18next";
import { Link } from "react-router-dom";

const WithAccount = () => {
  return (
    <Trans
      i18nKey="signUp.withAcc"
      components={{
        CustomParagraph: (
          <p className="text-center text-black dark:text-secondary-100" />
        ),
        CustomLink: (
          <Link to="/auth/sign-in" className="text-primary-200 font-bold" />
        ),
      }}
    />
  );
};

export default WithAccount;
