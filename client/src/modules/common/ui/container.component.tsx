import { PropsWithChildren } from "react";
import { cn } from "../../../utils/cn";

type ContainerProps = { className?: string } & PropsWithChildren;

const Container = ({ className, children }: ContainerProps) => {
  const classes = cn(
    "mx-auto px-5 max-w-container max-lg:pr-0 max-md:px-0",
    className
  );

  return <div className={classes}>{children}</div>;
};

export default Container;
