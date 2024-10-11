import GoogleAuth from "./google.auth.component";
import SignUpForm from "./sign.up.form.component";
import WithAccount from "./with.account";

const SignUp = () => {
  return (
    <div className="w-[320px]">
      <SignUpForm />
      <GoogleAuth />
      <WithAccount />
    </div>
  );
};

export default SignUp;
