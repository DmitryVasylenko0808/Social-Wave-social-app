import { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import { Link } from "react-router-dom";

type BaseButtonProps = {
  variant: "primary" | "secondary" | "terciary" | "remove";
};

type ButtonAsButtonProps = ComponentProps<"button"> &
  BaseButtonProps & {
    as?: "button";
  };

type ButtonAsLinkProps = ComponentProps<"a"> &
  BaseButtonProps & {
    as: "link";
    to: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button = ({ children, variant, className, ...btnProps }: ButtonProps) => {
  const classes = cn(
    "inline-flex items-center justify-center gap-5",
    {
      "px-5 py-4 bg-primary-100 text-white rounded-2xl active:bg-primary-200 disabled:bg-primary-100/40":
        variant === "primary",
      "min-w-btn py-2.5 bg-primary-200 border border-primary-200 text-white font-medium":
        variant === "secondary",
      "py-3 text-base text-secondary-100 font-medium hover:text-secondary-200":
        variant === "terciary",
      "px-5 py-4 bg-secondary-50 text-secondary-300 rounded-2xl font-medium":
        variant === "remove",
    },
    className
  );

  if (btnProps.as === "link") {
    return (
      <Link to={btnProps.to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...btnProps}>
      {children}
    </button>
  );
};

export default Button;
