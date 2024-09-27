import { Outlet } from "react-router";
import { Banner } from "../common/components";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen dark:bg-dark-100">
      <Banner />
      <div className="flex-1 pl-20 flex items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
