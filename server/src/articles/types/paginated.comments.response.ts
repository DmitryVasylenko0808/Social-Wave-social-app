import { Comment } from "../schemas/comment.schema";

export class PaginatedCommentsResponse {
    data: Comment[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
} 