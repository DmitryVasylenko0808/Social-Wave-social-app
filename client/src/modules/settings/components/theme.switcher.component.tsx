import { useTranslation } from "react-i18next";
import { useTheme } from "../../../hooks/useTheme";
import { Switch } from "../../common/ui";

const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { darkTheme, handleToggleDarkTheme } = useTheme();

  return (
    <div className="flex justify-between items-center">
      <label className="text-label font-medium">
        {t("settings.toggleDarkThemeLabel")}
      </label>
      <Switch value={darkTheme} onToggle={handleToggleDarkTheme} />
    </div>
  );
};

export default ThemeSwitcher;
