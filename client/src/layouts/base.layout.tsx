import React from "react";
import { Outlet } from "react-router";
import { Header } from "../common/components";

const BaseLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
