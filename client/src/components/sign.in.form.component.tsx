import React from "react";
import { TextField, Button } from "../common/ui";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInMutation } from "../api/auth/auth.api";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormFields = z.infer<typeof signInSchema>;

const SignInForm = () => {
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
    <form className="w-[320px]" onSubmit={handleSubmit(submitHandler)}>
      <h1 className="mb-7 text-primary-200 text-2xl font-bold">Sign In</h1>

      <div className="mb-5 flex flex-col space-y-4">
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
      </div>

      <p className="mb-2.5 text-center text-red-700 text-sm">
        {errors.root?.message}
      </p>

      <Button variant="primary" className="mb-8" disabled={isLoading}>
        Sign In
      </Button>

      <p className="text-black">
        Don't have an account?{" "}
        <Link to="/auth/sign-up" className="text-primary-200 font-bold">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
