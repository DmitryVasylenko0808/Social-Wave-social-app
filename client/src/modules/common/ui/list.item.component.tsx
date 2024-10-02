import { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

type ListItemProps = ComponentProps<"li">;

const ListItem = ({ className, children }: ListItemProps) => {
  const classes = cn("block", className);

  return <li className={classes}>{children}</li>;
};

export default ListItem;
