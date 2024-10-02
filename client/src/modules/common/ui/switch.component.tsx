import { ComponentProps, useState } from "react";
import { cn } from "../../../utils/cn";

type SwitchProps = ComponentProps<"div"> & {
  value?: boolean;
  label?: string;

  onToggle: () => void;
};

const Switch = ({ value = false, label, className, onToggle }: SwitchProps) => {
  const classes = cn("inline-flex items-center gap-4", className);
  const classesToggler = cn(
    "w-14 h-8 flex items-center rounded-full p-1 cursor-pointer",
    {
      "bg-primary-200": value === true,
      "bg-secondary-100": value === false,
    }
  );
  const classesSlider = cn(
    "bg-white w-6 h-6 rounded-full shadow-md transform",
    {
      "translate-x-6": value === true,
    }
  );

  return (
    <div className={classes}>
      <label className="text-label font-medium">{label}</label>
      <label className={classesToggler} onClick={onToggle}>
        <div className={classesSlider}></div>
      </label>
    </div>
  );
};

export default Switch;
