import React from "react";
import { Outlet } from "react-router";
import { Header } from "../common/components";
import { Container } from "../common/ui";
import SideBar from "../components/sidebar.component";

const BaseLayout = () => {
  return (
    <main>
      <Header />
      <main>
        <Container className="flex">
          <SideBar />
          <section className="flex-auto px-6">
            <Outlet />
          </section>
        </Container>
      </main>
    </main>
  );
};

export default BaseLayout;
