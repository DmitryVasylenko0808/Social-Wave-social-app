import React from "react";
import { Outlet } from "react-router";
import { Header } from "../common/components";
import { Container } from "../common/ui";

const BaseLayout = () => {
  return (
    <main>
      <Header />
      <section>
        <Container className="flex">
          <Outlet />
        </Container>
      </section>
    </main>
  );
};

export default BaseLayout;
