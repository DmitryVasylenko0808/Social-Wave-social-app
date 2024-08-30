import React from "react";
import { NavLink } from "react-router-dom";
import { House, Bookmark, UserRound, LogOut } from "lucide-react";
import { Button } from "../common/ui";
import { useAuth } from "../hooks/useAuth";

const SideBar = () => {
  const { logOut } = useAuth();

  return (
    <aside className="min-h-screen pt-5 px-3 border-r border-secondary-50">
      <ul className="flex flex-col text-base text-secondary-100 font-medium">
        <li className="block">
          <NavLink to="/" className="py-3 flex items-center gap-5">
            <House />
            Home
          </NavLink>
        </li>
        <li className="block">
          <NavLink to="/bookmarks" className="py-3 flex items-center gap-5">
            <Bookmark />
            Bookmarks
          </NavLink>
        </li>
        <li className="block">
          <NavLink to="/profile" className="py-3 flex items-center gap-5">
            <UserRound />
            My Profile
          </NavLink>
        </li>
      </ul>
      <div className="my-2 w-full border border-secondary-50" />
      <Button variant="terciary" onClick={logOut}>
        <LogOut />
        Log Out
      </Button>
    </aside>
  );
};

export default SideBar;
