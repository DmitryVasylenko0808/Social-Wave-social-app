import { ComponentProps } from "react";
import { cn } from "../../../utils/cn";
import { Link, LinkProps } from "react-router-dom";

type BaseButtonProps = {
  variant: "primary" | "secondary" | "tertiary";
};

type ButtonAsButtonProps = ComponentProps<"button"> &
  BaseButtonProps & {
    as?: "button";
  };

type ButtonAsLinkProps = LinkProps &
  BaseButtonProps & {
    as: "link";
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button = ({ children, variant, className, ...btnProps }: ButtonProps) => {
  const classes = cn(
    "inline-flex items-center justify-center gap-5",
    {
      "min-w-btn py-2.5 px-5 bg-primary-200 border border-primary-200 rounded-full text-white font-medium hover:bg-primary-300 active:bg-primary-300":
        variant === "primary",
      "min-w-btn px-5 py-3 bg-secondary-50 text-secondary-300 rounded-full font-medium dark:bg-dark-200 dark:text-secondary-50":
        variant === "secondary",
      "py-3 text-base text-secondary-100 font-medium hover:text-secondary-200":
        variant === "tertiary",
    },
    className
  );

  if (btnProps.as === "link") {
    return (
      <Link to={btnProps.to} className={classes} state={btnProps.state}>
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
