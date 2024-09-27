import { Outlet } from "react-router";
import { Logo } from "../common/components";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-dark-100">
      <Logo className="mb-20" />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
