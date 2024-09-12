import { articlesImgUrl } from "../../api/constants";

type ArticleImagesPreviewProps = {
  preview?: string[] | null;
  defaultImages?: string[] | null;
};

const ArticleImagesPreview = ({
  preview,
  defaultImages,
}: ArticleImagesPreviewProps) => {
  if (!preview && !defaultImages) {
    return null;
  }

  const images =
    preview || defaultImages?.map((img) => `${articlesImgUrl}/${img}`);

  return (
    <div className="py-4 flex flex-wrap gap-7">
      {images?.map((image, index) => (
        <img
          className="max-w-52 max-h-52 rounded-xl"
          src={image}
          alt={`image ${index}`}
          key={index}
        />
      ))}
    </div>
  );
};

export default ArticleImagesPreview;
