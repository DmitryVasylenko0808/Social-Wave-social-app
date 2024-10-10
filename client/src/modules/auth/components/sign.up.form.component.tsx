import { TextField, Button, ImageFileSelect, Loader } from "../../common/ui";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useSignUpMutation } from "../../../api/auth/auth.api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useTranslation } from "react-i18next";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    secondName: z.string().min(1, "Second Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string(),
    avatar: z
      .any()
      .refine(
        (files: FileList) => {
          return (
            !files[0] ||
            files[0].type === "image/jpeg" ||
            files[0].type === "image/jpg"
          );
        },
        {
          message: "Only .jpeg format is supported",
        }
      )
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormFields = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [triggerSignUp, { isLoading }] = useSignUpMutation();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpSchema),
  });

  const submitHandler = (data: SignUpFormFields) => {
    const { confirmPassword, avatar, ...other } = data;

    const signUpData = avatar ? { avatar: avatar[0] as File, ...other } : other;

    triggerSignUp(signUpData)
      .unwrap()
      .then((data) => navigate("/auth/verify-email", { state: data }))
      .catch((error) =>
        setError("root", { type: "server", message: error.data.message })
      );
  };

  return (
    <form className="w-[320px]" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="mb-7 text-primary-200 text-2xl text-center font-bold">
        {t("signUp.title")}
      </h2>

      <div className="mb-5 flex flex-col space-y-4">
        <TextField
          {...register("firstName")}
          label={t("signUp.fields.firstName")}
          error={errors.firstName?.message}
        />
        <TextField
          {...register("secondName")}
          label={t("signUp.fields.secondName")}
          error={errors.secondName?.message}
        />
        <TextField
          {...register("email")}
          label={t("signUp.fields.email")}
          type="email"
          error={errors.email?.message}
        />
        <TextField
          {...register("password")}
          label={t("signUp.fields.password")}
          type="password"
          error={errors.password?.message}
        />
        <TextField
          {...register("confirmPassword")}
          label={t("signUp.fields.confirmPassword")}
          type="password"
          error={errors.confirmPassword?.message}
        />
        <div className="inline-flex justify-center">
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <ImageFileSelect
                {...register("avatar")}
                label={t("signUp.fields.profilePhoto")}
                onFileChange={field.onChange}
              />
            )}
          />
        </div>
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
          t("signUp.submitBtn")
        )}
      </Button>

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
    </form>
  );
};

export default SignUpForm;
