import React from "react";
import { Outlet } from "react-router";

const BaseLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BaseLayout;
