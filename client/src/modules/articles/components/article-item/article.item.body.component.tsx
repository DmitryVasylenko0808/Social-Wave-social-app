import { articlesImgUrl } from "../../../../api/constants";
import { ArticleItemProps } from "./article.item.component";

type ArticleItemBodyProps = Pick<ArticleItemProps, "data">;

const ArticleItemBody = ({ data }: ArticleItemBodyProps) => {
  return (
    <div>
      <p className="mb-4 dark:text-secondary-100">{data?.text}</p>
      {!!data.images?.length && (
        <div className="mb-4 flex gap-2">
          {data.images.map((image, index) => (
            <img
              className="size-fit h-[200px] rounded-xl"
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
