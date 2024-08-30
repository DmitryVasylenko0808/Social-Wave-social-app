import React, { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = ComponentProps<"button"> & {
  variant: "primary" | "secondary";
};

const Button = ({ children, variant, className, ...btnProps }: ButtonProps) => {
  const classes = cn(
    "px-5 py-4",
    {
      "bg-primary-100 text-white rounded-2xl active:bg-primary-200 disabled:bg-primary-100/40":
        variant === "primary",
    },
    className
  );

  return (
    <button className={classes} {...btnProps}>
      {children}
    </button>
  );
};

export default Button;
