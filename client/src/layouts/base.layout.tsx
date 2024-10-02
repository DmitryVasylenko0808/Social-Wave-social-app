import { Outlet } from "react-router";
import { Header } from "../modules/common/components";
import { Container } from "../modules/common/ui";
import SideBar from "../modules/common/components/sidebar.component";

const BaseLayout = () => {
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
