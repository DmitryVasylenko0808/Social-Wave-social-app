import {
  House,
  Mail,
  Bookmark,
  Settings,
  UserRound,
  LogOut,
  LogIn,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { ListItem, ListDivider, Button, List } from "../ui";

const NavBar = () => {
  const { isAuthenticated, user, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <List className="gap-0 text-base text-secondary-100 font-medium">
      <ListItem>
        <NavLink to="/" className="py-3 flex items-center gap-5">
          <House />
          <span className="max-lg:hidden max-md:inline">
            {t("sidebar.home")}
          </span>
        </NavLink>
      </ListItem>
      {isAuthenticated && (
        <>
          <ListItem>
            <NavLink to="/messages" className="py-3 flex items-center gap-5">
              <Mail />
              <span className="max-lg:hidden max-md:inline">
                {t("sidebar.messages")}
              </span>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="/bookmarks" className="py-3 flex items-center gap-5">
              <Bookmark />
              <span className="max-lg:hidden max-md:inline">
                {t("sidebar.bookmarks")}
              </span>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to="/settings" className="py-3 flex items-center gap-5">
              <Settings />
              <span className="max-lg:hidden max-md:inline">
                {t("sidebar.settings")}
              </span>
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              to={`/users/${user.userId}/profile`}
              className="py-3 flex items-center gap-5"
            >
              <UserRound />
              <span className="max-lg:hidden max-md:inline">
                {t("sidebar.profile")}
              </span>
            </NavLink>
          </ListItem>
        </>
      )}
      <ListDivider />
      {isAuthenticated ? (
        <ListItem>
          <Button variant="tertiary" onClick={logOut}>
            <LogOut />
            <span className="max-lg:hidden max-md:inline">
              {t("sidebar.logOutBtn")}
            </span>
          </Button>
        </ListItem>
      ) : (
        <ListItem>
          <Button as="link" variant="tertiary" to="/auth/sign-in">
            <LogIn />
            <span className="max-lg:hidden max-md:inline">
              {t("sidebar.signInBtn")}
            </span>
          </Button>
        </ListItem>
      )}
    </List>
  );
};

export default NavBar;
