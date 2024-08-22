import { User } from "../schemas/user.schema"

export type PaginatedUsersResponse = {
    data: User[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}