import React, { ComponentProps, forwardRef } from "react";
import { cn } from "../../../utils/cn";

type TextFieldProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, leftAddon, rightAddon, className, ...inputProps }, ref) => {
    const classes = cn("flex flex-col", className);

    return (
      <div className={classes}>
        <label className="mb-1.5 text-label text-sm">{label}</label>
        <label className="px-3 py-2 flex gap-3 bg-labelFill border-1 border-textFieldBorder rounded text-xl cursor-text dark:bg-dark-200 dark:border-dark-300 dark:text-secondary-50">
          {leftAddon}
          <input
            className="p-0 flex-auto border-0 outline-0 bg-inherit text-xl shadow-none focus:ring-0"
            ref={ref}
            {...inputProps}
          />
          {rightAddon}
        </label>
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }
);

export default TextField;
