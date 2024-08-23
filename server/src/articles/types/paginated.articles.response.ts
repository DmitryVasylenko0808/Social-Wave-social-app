import { Article } from "../schemas/article.schema";

export class PaginatedArticlesResponse {
    data: Article[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
} 