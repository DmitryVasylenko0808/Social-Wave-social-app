import { ComponentProps, forwardRef, memo } from "react";
import { cn } from "../../../utils/cn";

type ListItemProps = ComponentProps<"li">;

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children }, ref) => {
    const classes = cn("block", className);

    return (
      <li className={classes} ref={ref}>
        {children}
      </li>
    );
  }
);

export default memo(ListItem);
