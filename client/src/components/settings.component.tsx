import { useRef, useState } from "react";
import { Select, SelectItem, Switch } from "../common/ui";
import { useClickOutside } from "../hooks/useClickOutside";
import { useTheme } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";

const lngs = {
  en: "English",
  uk: "Українська",
};

const Settings = () => {
  const { darkTheme, handleToggleDarkTheme } = useTheme();
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
    <div className="px-6 py-4">
      <div className="w-64 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <label className="text-label font-medium">
            {t("settings.toggleDarkThemeLabel")}
          </label>
          <Switch value={darkTheme} onToggle={handleToggleDarkTheme} />
        </div>
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
      </div>
    </div>
  );
};

export default Settings;
