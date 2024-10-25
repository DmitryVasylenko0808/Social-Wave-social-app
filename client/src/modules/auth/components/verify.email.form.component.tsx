import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useVerifyEmailMutation } from "../api/auth.api";
import { Button, Loader, TextField } from "../../common/ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

const verifyEmailSchema = z.object({
  code: z.string().min(1, "Verification code is required"),
});

type VerifyEmailFormFields = z.infer<typeof verifyEmailSchema>;

const VerifyEmailForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [triggerVerifyEmail, { isLoading }] = useVerifyEmailMutation();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormFields>({
    resolver: zodResolver(verifyEmailSchema),
  });
  const { authenticate } = useAuth();
  const { t } = useTranslation();

  const submitHandler = (data: VerifyEmailFormFields) => {
    const verifyData = { userId: location.state.userId, code: data.code };

    triggerVerifyEmail(verifyData)
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
    <form className="w-[320px]" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="mb-4 text-primary-200 text-2xl text-center font-bold">
        {t("verifyEmail.title")}
      </h2>
      <p className="mb-7 text-center dark:text-secondary-100">
        {t("verifyEmail.text")}
      </p>

      <div className="mb-5 flex flex-col space-y-4">
        <TextField
          {...register("code")}
          label={t("verifyEmail.fields.code")}
          error={errors.code?.message}
        />
      </div>

      <p className="mb-2.5 text-center text-red-700 text-sm">
        {errors.root?.message}
      </p>

      <Button
        type="submit"
        variant="primary"
        className="mb-8 w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader size="small" variant="secondary" />
        ) : (
          t("verifyEmail.submitBtn")
        )}
      </Button>
    </form>
  );
};

export default VerifyEmailForm;
