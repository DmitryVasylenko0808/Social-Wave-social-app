import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type MenuItemProps = ComponentProps<"li">;

const MenuItem = ({ children, className, ...menuItemProps }: MenuItemProps) => {
  const classes = cn("cursor-pointer flex items-center gap-3", className);

  return (
    <li className={classes} {...menuItemProps}>
      {children}
    </li>
  );
};

export default MenuItem;
