import { TextField, Button } from "../common/ui";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useSignUpMutation } from "../api/auth/auth.api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import ImageFileSelect from "../common/ui/image.file.select";

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
  const navigate = useNavigate();

  const [triggerSignUp, { isLoading }] = useSignUpMutation();

  const { authenticate } = useAuth();
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
      <h1 className="mb-7 text-primary-200 text-2xl font-bold">Sign Up</h1>

      <div className="mb-5 flex flex-col space-y-4">
        <TextField
          {...register("firstName")}
          label="First Name"
          error={errors.firstName?.message}
        />
        <TextField
          {...register("secondName")}
          label="Second Name"
          error={errors.secondName?.message}
        />
        <TextField
          {...register("email")}
          label="Email"
          type="email"
          error={errors.email?.message}
        />
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          error={errors.password?.message}
        />
        <TextField
          {...register("confirmPassword")}
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
        />
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <ImageFileSelect
              {...register("avatar")}
              label="Profile photo"
              onFileChange={field.onChange}
            />
          )}
        />
      </div>

      <p className="mb-2.5 text-center text-red-700 text-sm">
        {errors.root?.message}
      </p>

      <Button
        type="submit"
        variant="primary"
        className="mb-8"
        disabled={isLoading}
      >
        Sign Up
      </Button>

      <p className="text-black">
        Already have an account?{" "}
        <Link to="/auth/sign-in" className="text-primary-200 font-bold">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
