import { PropsWithChildren } from "react";

type UserExplorerProps = PropsWithChildren;

const UserExplorer = ({ children }: UserExplorerProps) => {
  return (
    <div className="min-w-[320px]">
      <div className="sticky top-0 pl-6 py-5">{children}</div>
    </div>
  );
};

export default UserExplorer;
