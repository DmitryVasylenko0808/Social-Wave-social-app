import { articlesImgUrl } from "../../../api/constants";
import { ArticleItemProps } from "./article.item.component";

type ArticleItemBodyProps = Pick<ArticleItemProps, "data">;

const ArticleItemBody = ({ data }: ArticleItemBodyProps) => {
  return (
    <div>
      <p className="mb-1 dark:text-secondary-100">{data?.text}</p>
      {data.images && (
        <div className="py-4 flex flex-wrap gap-7">
          {data.images.map((image, index) => (
            <img
              className="max-w-52 max-h-52 rounded-xl"
              src={`${articlesImgUrl}/${image}`}
              alt={`image ${index}`}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleItemBody;
