import React, { ComponentProps, forwardRef, useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { Camera } from "lucide-react";
import { userAvatarsUrl } from "../../api/constants";

type ImageFileSelectProps = ComponentProps<"input"> & {
  label?: string;
  defaultImageUrl?: string;
  onFileChange: (file: File | null) => void;
};

const ImageFileSelect = forwardRef<HTMLInputElement, ImageFileSelectProps>(
  ({ label, defaultImageUrl, className, onFileChange, ...inputProps }, ref) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
      onFileChange(file);
    };

    const classes = cn(
      "cursor-pointer w-[112px] h-[112px] inline-flex flex-col items-center justify-center rounded-full bg-blue-50 border border-primary-200 text-primary-200",
      className
    );

    let content;

    if (preview || defaultImageUrl) {
      if (preview) {
        content = (
          <img src={preview} alt="Preview avatar" className="w-full h-full" />
        );
      } else {
        content = (
          <img
            src={defaultImageUrl}
            alt="Preview avatar"
            className="w-full h-full"
          />
        );
      }
    } else {
      content = (
        <>
          <Camera className="text-center" />
          <span className="text-primary-100 text-center">{label}</span>
        </>
      );
    }

    return (
      <label className={classes}>
        {content}
        <input
          {...inputProps}
          type="file"
          className="outline-0 w-0 h-0 opacity-0"
          ref={ref}
          onChange={handleFileChange}
        />
      </label>
    );
  }
);

export default ImageFileSelect;
