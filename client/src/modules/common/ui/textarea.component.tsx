import React, { ComponentProps, forwardRef } from "react";
import { cn } from "../../../utils/cn";

type TextAreaProps = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...textAreaProps }, ref) => {
    const classes = cn(
      "bg-labelFill border-1 border-textFieldBorder rounded text-xl resize-none dark:bg-dark-200 dark:border-dark-300 dark:text-secondary-50",
      className
    );

    return (
      <div className="flex flex-col">
        <label className="mb-1.5 text-label text-sm">{label}</label>
        <textarea className={classes} ref={ref} {...textAreaProps} />
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }
);

export default TextArea;
