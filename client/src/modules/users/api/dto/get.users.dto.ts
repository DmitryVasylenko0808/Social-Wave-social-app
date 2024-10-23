export type User = {
  _id: string;
  firstName: string;
  secondName: string;
  avatar: string;
};

export type GetUsersDto = {
  data: User[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  searchValue?: string;
};
