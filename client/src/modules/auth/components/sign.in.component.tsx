import GoogleAuth from "./google.auth.component";
import SignInForm from "./sign.in.form.component";
import WithoutAccount from "./without.account.";

const SignIn = () => {
  return (
    <div className="w-[320px]">
      <SignInForm />
      <GoogleAuth />
      <WithoutAccount />
    </div>
  );
};

export default SignIn;
