import { useAlerts } from "../../common/hooks/useAlerts";
import { useForgotPasswordMutation } from "../api/auth.api";
import { useForm } from "react-hook-form";
import { Button, Loader, TextField } from "../../common/ui";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

type ForgotPasswordFormFields = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const alerts = useAlerts();
  const [triggerForgotPassword, { isLoading }] = useForgotPasswordMutation();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormFields>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { t } = useTranslation();

  const submitHandler = (data: ForgotPasswordFormFields) => {
    triggerForgotPassword(data)
      .unwrap()
      .then(() => alerts.success(t("forgotPassword.success")))
      .catch((error) =>
        setError("root", { type: "server", message: error.data.message })
      );
  };

  return (
    <form className="w-[320px]" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="mb-4 text-primary-200 text-2xl text-center font-bold">
        {t("forgotPassword.title")}
      </h2>
      <p className="mb-7 text-center dark:text-secondary-100">
        {t("forgotPassword.text")}
      </p>

      <div className="mb-5 flex flex-col space-y-4">
        <TextField
          {...register("email")}
          label={t("forgotPassword.fields.email")}
          error={errors.email?.message}
        />
      </div>

      <p className="mb-2.5 text-center text-red-700 text-sm">
        {errors.root?.message}
      </p>

      <p className="mb-5 text-center text-primary-100 hover:text-primary-200">
        <Link to="/auth/sign-in" className="underline">
          {t("forgotPassword.back")}
        </Link>
      </p>

      <Button
        type="submit"
        variant="secondary"
        className="mb-8 w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader size="small" variant="secondary" />
        ) : (
          t("forgotPassword.submitBtn")
        )}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
