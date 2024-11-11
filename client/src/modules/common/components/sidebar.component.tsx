import { NavLink } from "react-router-dom";
import {
  House,
  Bookmark,
  UserRound,
  LogOut,
  LogIn,
  Settings,
  Mail,
} from "lucide-react";
import { Button, List, ListDivider, ListItem } from "../ui";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { isAuthenticated, user, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <aside className="min-w-[180px] min-h-[calc(100vh-90px)] pr-6 border-r border-secondary-50 dark:border-dark-200 max-lg:min-w-max max-md:hidden">
      <div className="sticky top-0 pt-5">
        <List className="gap-0 text-base text-secondary-100 font-medium">
          <ListItem>
            <NavLink to="/" className="py-3 flex items-center gap-5">
              <House />
              <span className="max-lg:hidden">{t("sidebar.home")}</span>
            </NavLink>
          </ListItem>
          {isAuthenticated && (
            <>
              <ListItem>
                <NavLink
                  to="/messages"
                  className="py-3 flex items-center gap-5"
                >
                  <Mail />
                  <span className="max-lg:hidden">{t("sidebar.messages")}</span>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="/bookmarks"
                  className="py-3 flex items-center gap-5"
                >
                  <Bookmark />
                  <span className="max-lg:hidden">
                    {t("sidebar.bookmarks")}
                  </span>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="/settings"
                  className="py-3 flex items-center gap-5"
                >
                  <Settings />
                  <span className="max-lg:hidden">{t("sidebar.settings")}</span>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to={`/users/${user.userId}/profile`}
                  className="py-3 flex items-center gap-5"
                >
                  <UserRound />
                  <span className="max-lg:hidden">{t("sidebar.profile")}</span>
                </NavLink>
              </ListItem>
            </>
          )}
          <ListDivider />
          {isAuthenticated ? (
            <ListItem>
              <Button variant="tertiary" onClick={logOut}>
                <LogOut />
                <span className="max-lg:hidden">{t("sidebar.logOutBtn")}</span>
              </Button>
            </ListItem>
          ) : (
            <ListItem>
              <Button as="link" variant="tertiary" to="/auth/sign-in">
                <LogIn />
                <span className="max-lg:hidden">{t("sidebar.signInBtn")}</span>
              </Button>
            </ListItem>
          )}
        </List>
      </div>
    </aside>
  );
};

export default SideBar;
