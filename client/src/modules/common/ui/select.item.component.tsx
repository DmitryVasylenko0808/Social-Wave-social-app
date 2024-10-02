import React, { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

type SelectItemProps = ComponentProps<"li">;

const SelectItem = ({
  children,
  className,
  ...selectitemProps
}: SelectItemProps) => {
  const classes = cn(
    "p-2 cursor-pointer flex items-center gap-3 bg-white text-lg text-black dark:text-secondary-100 hover:bg-secondary-50 dark:bg-dark-200 dark:hover:bg-dark-300",
    className
  );

  return (
    <li className={classes} {...selectitemProps}>
      {children}
    </li>
  );
};

export default SelectItem;
