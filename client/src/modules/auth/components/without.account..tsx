import { Trans } from "react-i18next";
import { Link } from "react-router-dom";

const WithoutAccount = () => {
  return (
    <Trans
      i18nKey="signIn.withoutAcc"
      components={{
        CustomParagraph: (
          <p className="text-center text-black dark:text-secondary-100" />
        ),
        CustomLink: (
          <Link to="/auth/sign-up" className="text-primary-200 font-bold" />
        ),
      }}
    ></Trans>
  );
};

export default WithoutAccount;
