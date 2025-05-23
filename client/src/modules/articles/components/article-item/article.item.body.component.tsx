import { articlesImgUrl } from "../../../../core/constants";
import { ArticleItemProps } from "./article.item.component";

type ArticleItemBodyProps = Pick<ArticleItemProps, "data">;

const ArticleItemBody = ({ data }: ArticleItemBodyProps) => {
  return (
    <div>
      <p className="mb-2 dark:text-secondary-100">{data?.text}</p>
      {!!data.images?.length && (
        <div className="mb-2 flex flex-wrap gap-4 max-md:flex-col">
          {data.images.map((image, index) => (
            <img
              className="size-fit h-[200px] rounded-xl max-md:w-full max-md:h-[260px]"
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
