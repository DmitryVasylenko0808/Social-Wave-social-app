import React from "react";
import { Heart, MessageSquare, Repeat2, Bookmark } from "lucide-react";
import { Button } from "../ui";
import { Article } from "../../api/articles/dto/get.articles.dto";
import { Link } from "react-router-dom";

type ArticleItemProps = {
  data: Article;
};

const ArticleItem = ({ data }: ArticleItemProps) => {
  return (
    <article>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/users/1">
            <div className="w-[50px] h-[50px] bg-slate-600 rounded-full" />
          </Link>
          <Link to="/users/1">
            <span className="text-secondary-300 font-medium">
              {data.author.firstName} {data.author.secondName}
            </span>
          </Link>
        </div>
        <span className="text-secondary-100">{data.createdAt.toString()}</span>
      </div>
      <p className="mb-1">{data?.text}</p>
      <div className="flex">
        <div className="flex-1 flex justify-center">
          <Button variant="terciary">
            <Heart />
            <span>{data.likes.length}</span>
          </Button>
        </div>
        <div className="flex-1 flex justify-center">
          <Button variant="terciary">
            <MessageSquare />
            <span>{data.commentsCount}</span>
          </Button>
        </div>
        <div className="flex-1 flex justify-center">
          <Button variant="terciary">
            <Repeat2 />
            <span>{data.reposts.length}</span>
          </Button>
        </div>
        <div className="flex-1 flex justify-center">
          <Button variant="terciary">
            <Bookmark />
            <span>{data.bookmarks.length}</span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ArticleItem;
