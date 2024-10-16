import { Article } from '../schemas/article.schema';
import { SortDate } from './sort.date';

export class PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  sortDate?: SortDate;
}
