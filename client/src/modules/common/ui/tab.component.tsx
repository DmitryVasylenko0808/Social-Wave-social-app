import { ComponentProps } from "react";
import { cn } from "../../../utils/cn";

type TabProps = ComponentProps<"button"> & { active: boolean };

const Tab = ({ children, active, className, ...tabProps }: TabProps) => {
  const classes = cn(
    "px-6 py-3 text-lg text-secondary-100 font-medium",
    { "text-primary-200 border-b-2 border-b-primary-200": active },
    className
  );

  return (
    <button className={classes} {...tabProps}>
      {children}
    </button>
  );
};

export default Tab;
