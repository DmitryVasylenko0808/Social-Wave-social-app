import { useState } from "react";

export const usePage = () => {
  const [page, setPage] = useState<number>(1);

  const nextPage = () => setPage(page + 1);

  return { page, setPage, nextPage };
};
