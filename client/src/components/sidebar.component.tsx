import { NavLink } from "react-router-dom";
import { House, Bookmark, UserRound, LogOut, LogIn } from "lucide-react";
import { Button } from "../common/ui";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { isAuthenticated, user, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <aside className="min-w-[180px] min-h-screen pr-3 border-r border-secondary-50 dark:border-dark-200">
      <div className="sticky top-0 pt-5">
        <ul className="flex flex-col text-base text-secondary-100 font-medium">
          <li className="block">
            <NavLink to="/" className="py-3 flex items-center gap-5">
              <House />
              {t("sidebar.home")}
            </NavLink>
          </li>
          {isAuthenticated && (
            <li className="block">
              <NavLink to="/bookmarks" className="py-3 flex items-center gap-5">
                <Bookmark />
                {t("sidebar.bookmarks")}
              </NavLink>
            </li>
          )}
          {isAuthenticated && (
            <li className="block">
              <NavLink
                to={`/users/${user.userId}/profile`}
                className="py-3 flex items-center gap-5"
              >
                <UserRound />
                {t("sidebar.profile")}
              </NavLink>
            </li>
          )}
        </ul>
        <div className="my-2 w-full border border-secondary-50 dark:border-dark-200" />
        {isAuthenticated ? (
          <Button variant="terciary" onClick={logOut}>
            <LogOut />
            {t("sidebar.logOutBtn")}
          </Button>
        ) : (
          <Button as="link" variant="terciary" to="/auth/sign-in">
            <LogIn />
            {t("sidebar.signInBtn")}
          </Button>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
