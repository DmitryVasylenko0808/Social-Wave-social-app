import { Outlet } from "react-router";
import { Logo } from "../modules/common/components";
import { Suspense } from "react";
import { Loader } from "../modules/common/ui";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-dark-100">
      <Logo className="mb-9" />
      <Suspense fallback={<Loader position="center" />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AuthLayout;
