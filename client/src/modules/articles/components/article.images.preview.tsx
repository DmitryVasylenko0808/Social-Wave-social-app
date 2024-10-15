import { articlesImgUrl } from "../../../api/constants";

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
    <div className="py-4 flex flex-wrap gap-4">
      {images?.map((image, index) => (
        <img
          className="size-fit h-[200px] rounded-xl"
          src={image}
          alt={`image ${index}`}
          key={index}
        />
      ))}
    </div>
  );
};

export default ArticleImagesPreview;
