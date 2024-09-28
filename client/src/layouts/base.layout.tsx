import { Outlet } from "react-router";
import { Header } from "../common/components";
import { Container } from "../common/ui";
import SideBar from "../components/sidebar.component";
import { useEffect } from "react";

const BaseLayout = () => {
  useEffect(() => {
    // document.documentElement.classList.add("dark");
  }, []);

  return (
    <main className="dark:bg-dark-100">
      <Header />
      <main>
        <Container className="flex">
          <SideBar />
          <section className="flex-auto border-r border-secondary-50 dark:border-dark-200">
            <Outlet />
          </section>
        </Container>
      </main>
    </main>
  );
};

export default BaseLayout;
