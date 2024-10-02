import { useTranslation } from "react-i18next";
import { FileImage } from "lucide-react";
import { ComponentProps, forwardRef } from "react";

type ArticleImageFilesSelectProps = ComponentProps<"input">;

const ArticleImageFilesSelect = forwardRef<
  HTMLInputElement,
  ArticleImageFilesSelectProps
>(({ ...props }, ref) => {
  const { t } = useTranslation();

  return (
    <label className="px-4 inline-flex items-center gap-2 text-primary-200 hover:text-primary-200 cursor-pointer">
      <FileImage />
      <span className="font-medium">{t("createArticle.uploadImages")}</span>
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
