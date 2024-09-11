import { FileImage } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

type ArticleImageFilesSelectProps = ComponentProps<"input">;

const ArticleImageFilesSelect = forwardRef<
  HTMLInputElement,
  ArticleImageFilesSelectProps
>(({ ...props }, ref) => {
  return (
    <label className="px-4 text-primary-200 hover:text-primary-200 cursor-pointer">
      <FileImage />
      <input
        {...props}
        type="file"
        multiple
        className="outline-0 w-0 h-0 opacity-0"
        ref={ref}
      />
    </label>
  );
});

export default ArticleImageFilesSelect;
