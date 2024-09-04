import React, { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type AvatarProps = ComponentProps<"img"> & {
  variant: "medium" | "big";
};

const Avatar = ({ variant, className, ...imgProps }: AvatarProps) => {
  const classes = cn(
    "rounded-full",
    {
      "w-[60px] h-[60px]": variant === "medium",
      "w-[90px] h-[90px]": variant === "big",
    },
    className
  );

  return <img className={classes} {...imgProps} />;
};

export default Avatar;
