import NavBar from "./navbar";

const SideBar = () => {
  return (
    <aside className="min-w-[180px] min-h-[calc(100vh-90px)] pr-6 border-r border-secondary-50 dark:border-dark-200 max-lg:min-w-max max-md:hidden">
      <div className="sticky top-0 pt-5">
        <NavBar />
      </div>
    </aside>
  );
};

export default SideBar;
