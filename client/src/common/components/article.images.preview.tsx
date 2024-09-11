type ArticleImagesPreviewProps = {
  preview: string[];
};

const ArticleImagesPreview = ({ preview }: ArticleImagesPreviewProps) => {
  return (
    <div className="py-4 flex flex-wrap gap-7">
      {preview.map((image, index) => (
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
