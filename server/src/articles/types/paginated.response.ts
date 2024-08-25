import { Article } from "../schemas/article.schema";

export class PaginatedResponse<T> {
    data: T[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
} 