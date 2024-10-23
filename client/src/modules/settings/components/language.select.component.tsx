import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "../../common/hooks/useClickOutside";
import { Select, SelectItem } from "../../common/ui";

const lngs = {
  en: "English",
  uk: "Українська",
};

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const handleClickOpen = () => setOpen(true);

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <Select
      open={open}
      label={t("settings.selectLanguageLabel")}
      text={lngs[i18n.resolvedLanguage]}
      ref={ref}
      onOpen={handleClickOpen}
    >
      {Object.entries(lngs).map(([code, name]) => (
        <SelectItem onClick={() => handleChangeLanguage(code)} key={code}>
          {name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default LanguageSelect;
