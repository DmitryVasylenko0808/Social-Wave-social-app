import { ComponentProps, forwardRef } from "react";

type MenuProps = ComponentProps<"div"> & {
  open: boolean;
};

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ open, children, ...menuProps }, ref) => {
    if (!open) {
      return null;
    }

    return (
      <div
        className="absolute top-11 right-0 z-10 px-5 py-4 bg-white shadow-xl border border-textFieldBorder rounded-xl dark:bg-dark-200 dark:border-0"
        ref={ref}
        {...menuProps}
      >
        <ul className="flex flex-col gap-2">{children}</ul>
      </div>
    );
  }
);

export default Menu;
