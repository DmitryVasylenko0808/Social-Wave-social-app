import React, { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type ButtonProps = ComponentProps<"button"> & {
  variant: "primary" | "secondary" | "terciary";
};

const Button = ({ children, variant, className, ...btnProps }: ButtonProps) => {
  const classes = cn(
    "inline-flex items-center justify-center gap-5",
    {
      "px-5 py-4 bg-primary-100 text-white rounded-2xl active:bg-primary-200 disabled:bg-primary-100/40":
        variant === "primary",
      "py-3 text-base text-secondary-100 font-medium hover:text-secondary-200":
        variant === "terciary",
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
