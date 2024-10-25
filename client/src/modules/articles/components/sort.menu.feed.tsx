import { SortDate } from "../api/dto/get.articles.dto";
import { PropsWithChildren, useRef, useState } from "react";
import { useClickOutside } from "../../common/hooks/useClickOutside";
import { Button, Menu } from "../../common/ui";
import { useTranslation } from "react-i18next";

type MenuSortArticlesProps = PropsWithChildren & {
  value: SortDate;
};

const MenuSortArticles = ({ children, value }: MenuSortArticlesProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useClickOutside(ref, () => setOpenMenu(false));

  const handleClickMenu = () => setOpenMenu(true);

  return (
    <div className="relative">
      <Button variant="terciary" onClick={handleClickMenu}>
        {t("sortMenuFeed.title")}:{" "}
        {value === "desc"
          ? t("sortMenuFeed.items.newest")
          : t("sortMenuFeed.items.oldest")}
      </Button>

      <Menu open={openMenu} ref={ref}>
        {children}
      </Menu>
    </div>
  );
};

export default MenuSortArticles;
