import { NavigateBack } from "../../common/components";
import ThemeSwitcher from "./theme.switcher.component";
import LanguageSelect from "./language.select.component";

const Settings = () => {
  return (
    <>
      <NavigateBack />
      <div className="pt-6 pb-4 px-6">
        <div className="w-64 flex flex-col gap-10">
          <ThemeSwitcher />
          <LanguageSelect />
        </div>
      </div>
    </>
  );
};

export default Settings;
