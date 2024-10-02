import { NavigateBack } from "../../common/components";
import ThemeSwitcher from "./theme.switcher.component";
import LanguageSelect from "./language.select.component";

const Settings = () => {
  return (
    <div className="px-6 py-2">
      <NavigateBack />
      <div className="w-64 flex flex-col gap-10">
        <ThemeSwitcher />
        <LanguageSelect />
      </div>
    </div>
  );
};

export default Settings;
