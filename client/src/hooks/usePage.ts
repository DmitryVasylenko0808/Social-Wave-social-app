import { useCallback, useState } from "react";

export const usePage = () => {
  const [page, setPage] = useState<number>(1);

  const nextPage = useCallback(() => setPage((prev) => prev + 1), []);

  return { page, setPage, nextPage };
};
