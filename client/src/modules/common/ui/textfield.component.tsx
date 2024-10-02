import React, { ComponentProps, forwardRef } from "react";
import { cn } from "../../../utils/cn";

type TextFieldProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, className, ...inputProps }, ref) => {
    const classes = cn("flex flex-col", className);

    return (
      <div className={classes}>
        <label className="mb-1.5 text-label text-sm">{label}</label>
        <input
          className="bg-labelFill border-1 border-textFieldBorder rounded text-xl dark:bg-dark-200 dark:border-dark-300 dark:text-secondary-50"
          ref={ref}
          {...inputProps}
        />
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }
);

export default TextField;
