import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useAlerts } from "../../../hooks/useAlerts";
import { useResetPasswordMutation } from "../../../api/auth/auth.api";
import { useForm } from "react-hook-form";
import { Button, Loader, TextField } from "../../common/ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must have at least 8 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

type ResetPasswordFormFields = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const alerts = useAlerts();
  const [params] = useSearchParams();
  const [triggerResetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormFields>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const submitHandler = (data: ResetPasswordFormFields) => {
    const resetPasswordData = {
      token: params.get("token") as string,
      newPassword: data.newPassword,
    };

    triggerResetPassword(resetPasswordData)
      .unwrap()
      .then(() => {
        alerts.success(
          "Your password has been successfully changed. Sign in with new password."
        );
        navigate("/auth/sign-in");
      })
      .catch((error) =>
        setError("root", { type: "server", message: error.data.message })
      );
  };

  return (
    <form className="w-[320px]" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="mb-7 text-primary-200 text-2xl text-center font-bold">
        Reset Password
      </h2>

      <div className="mb-5 flex flex-col space-y-4">
        <TextField
          {...register("newPassword")}
          label="Password"
          type="password"
          error={errors.newPassword?.message}
        />
        <TextField
          {...register("confirmNewPassword")}
          label="Confirm Password"
          type="password"
          error={errors.confirmNewPassword?.message}
        />
      </div>

      <p className="mb-2.5 text-center text-red-700 text-sm">
        {errors.root?.message}
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
          "Reset Password"
        )}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
