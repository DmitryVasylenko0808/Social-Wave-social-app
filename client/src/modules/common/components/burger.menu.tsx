import { useEffect, useState } from "react";
import { Button } from "../ui";
import { Menu as BurgerMenuIcon, X } from "lucide-react";
import NavBar from "./navbar";
import { useLocation } from "react-router";

const BurgerMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);

  return (
    <div className="hidden max-md:block">
      <Button variant="tertiary" onClick={handleClickOpen}>
        <BurgerMenuIcon size={32} />
      </Button>
      {open && (
        <div className="fixed top-0 left-0 z-50 w-full min-h-screen p-5 bg-white dark:bg-dark-100">
          <div className="flex justify-end">
            <Button variant="tertiary" onClick={handleClickClose}>
              <X size={32} />
            </Button>
          </div>
          <NavBar />
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
