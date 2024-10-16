import { ComponentProps, PropsWithChildren } from "react";

type TabsProps = ComponentProps<"div"> & PropsWithChildren;

const Tabs = ({ children, ...tabsProps }: TabsProps) => {
  return (
    <div
      className="mb-1 flex border-b-2 border-secondary-50 dark:border-dark-200"
      {...tabsProps}
    >
      {children}
    </div>
  );
};

export default Tabs;
