import { useEffect, useState } from "react";
import { Switch } from "../common/ui";
import { useTheme } from "../hooks/useTheme";

const Settings = () => {
  const { darkTheme, handleToggleDarkTheme } = useTheme();

  return (
    <div className="px-6 py-4">
      <div className="w-64 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <label className="text-label font-medium">Dark Theme</label>
          <Switch value={darkTheme} onToggle={handleToggleDarkTheme} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
