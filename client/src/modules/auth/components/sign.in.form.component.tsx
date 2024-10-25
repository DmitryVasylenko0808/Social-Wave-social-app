import { TextField, Button, Loader } from "../../common/ui";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../api/auth.api";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormFields = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [triggerSignIn, { isLoading }] = useSignInMutation();
  const { authenticate } = useAuth();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInSchema),
  });

  const submitHandler = (data: SignInFormFields) => {
    triggerSignIn(data)
      .unwrap()
      .then(({ token }) => {
        authenticate(token);
        navigate("/");
      })
      .catch((error) =>
        setError("root", { type: "server", message: error.data.message })
      );
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <h2 className="mb-7 text-primary-200 text-2xl text-center font-bold">
        {t("signIn.title")}
      </h2>

      <div className="mb-5 flex flex-col space-y-4">
        <TextField
          {...register("email")}
          label={t("signIn.fields.email")}
          type="email"
          error={errors.email?.message}
        />
        <TextField
          {...register("password")}
          label={t("signIn.fields.password")}
          type="password"
          error={errors.password?.message}
        />
      </div>

      <p className="mb-2.5 text-center text-red-700 text-sm">
        {errors.root?.message}
      </p>

      <p className="mb-5 text-center text-primary-100 hover:text-primary-200">
        <Link to="/auth/forgot-password" className="underline">
          {t("signIn.forgotPassword")}
        </Link>
      </p>

      <Button variant="secondary" className="mb-8 w-full" disabled={isLoading}>
        {isLoading ? (
          <Loader size="small" variant="secondary" />
        ) : (
          t("signIn.submitBtn")
        )}
      </Button>
    </form>
  );
};

export default SignInForm;
