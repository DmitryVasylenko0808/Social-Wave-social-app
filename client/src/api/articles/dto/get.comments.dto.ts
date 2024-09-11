import { Author } from "./get.articles.dto";

export type Comment = {
  _id: string;
  text: string;
  author: Author;
  createdAt: Date;
  updatedAt: Date;
};

export type GetCommentsDto = {
  data: Comment[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
