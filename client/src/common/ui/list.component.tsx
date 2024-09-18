import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type ListProps = ComponentProps<"ul">;

const List = ({ className, children }: ListProps) => {
  const classes = cn("flex flex-col gap-14", className);

  return <ul className={classes}>{children}</ul>;
};

export default List;
