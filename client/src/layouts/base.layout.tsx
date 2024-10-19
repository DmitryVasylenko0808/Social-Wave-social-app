import { Outlet } from "react-router";
import { Header, UserExplorer } from "../modules/common/components";
import { Container, Loader } from "../modules/common/ui";
import { SideBar } from "../modules/common/components";
import { Suspense } from "react";
import { UserSearch, UserSuggestions } from "../modules/users/components";

const BaseLayout = () => {
  return (
    <main className="dark:bg-dark-100">
      <Header />
      <main>
        <Container className="flex">
          <SideBar />
          <section className="flex-auto border-r border-secondary-50 dark:border-dark-200">
            <Suspense fallback={<Loader className="py-12" position="center" />}>
              <Outlet />
            </Suspense>
          </section>
          <UserExplorer>
            <UserSearch />
            <UserSuggestions />
          </UserExplorer>
        </Container>
      </main>
    </main>
  );
};

export default BaseLayout;
