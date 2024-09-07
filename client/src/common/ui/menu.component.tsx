import { PropsWithChildren } from "react";

type MenuProps = PropsWithChildren & {
  open: boolean;
};

const Menu = ({ open, children }: MenuProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="absolute top-11 right-0 z-10 px-5 py-4 bg-white shadow-xl border border-textFieldBorder rounded-xl">
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
};

export default Menu;
