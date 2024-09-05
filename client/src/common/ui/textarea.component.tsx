import React, { ComponentProps, forwardRef } from "react";
import { cn } from "../../utils/cn";

type TextAreaProps = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...textAreaProps }, ref) => {
    const classes = cn("flex flex-col", className);

    return (
      <div className={classes}>
        <label className="mb-1.5 text-label text-sm">{label}</label>
        <textarea
          className="bg-labelFill border-1 border-TextAreaBorder rounded text-xl"
          ref={ref}
          {...textAreaProps}
        />
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }
);

export default TextArea;
