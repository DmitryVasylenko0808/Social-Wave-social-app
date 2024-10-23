import { useEffect, useState } from "react";
import { articlesImgUrl } from "../../../core/constants";

export const useImagePreview = (defaultImages?: string[]) => {
  const [imagesPreview, setImagesPreview] = useState<string[] | null>(null);

  useEffect(() => {
    if (defaultImages) {
      const imgs = defaultImages.map((img) => `${articlesImgUrl}/${img}`);
      setImagesPreview(imgs);
    }
  }, [defaultImages]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files?.length) {
      const newPreviews: string[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.result) {
            newPreviews.push(reader.result as string);
            if (newPreviews.length === files.length) {
              setImagesPreview(newPreviews);
            }
          }
        };

        reader.readAsDataURL(file);
      });
    } else {
      const imgs = defaultImages
        ? defaultImages.map((img) => `${articlesImgUrl}/${img}`)
        : null;
      setImagesPreview(imgs);
    }
  };

  const clearPreviewImages = () => setImagesPreview(null);

  return { imagesPreview, handleImagesChange, clearPreviewImages };
};
