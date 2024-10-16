import { SortDate } from "../../../api/articles/dto/get.articles.dto";
import { PropsWithChildren, useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { Button, Menu } from "../../common/ui";

type MenuSortArticlesProps = PropsWithChildren & {
  value: SortDate;
};

const MenuSortArticles = ({ children, value }: MenuSortArticlesProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickMenu = () => setOpenMenu(true);

  return (
    <div className="relative">
      <Button variant="terciary" onClick={handleClickMenu}>
        Sort by: {value === "desc" ? "Newest" : "Oldest"}
      </Button>

      <Menu open={openMenu} ref={ref}>
        {children}
      </Menu>
    </div>
  );
};

export default MenuSortArticles;
