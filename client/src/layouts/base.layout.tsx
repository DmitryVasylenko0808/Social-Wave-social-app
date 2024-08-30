import React from "react";
import { Outlet } from "react-router";
import { Header } from "../common/components";
import { Container } from "../common/ui";
import SideBar from "../components/sidebar.component";

const BaseLayout = () => {
  return (
    <main>
      <Header />
      <section>
        <Container className="flex">
          <SideBar />
          <Outlet />
        </Container>
      </section>
    </main>
  );
};

export default BaseLayout;
