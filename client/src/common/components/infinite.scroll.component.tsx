import React, { PropsWithChildren, useEffect, useState } from "react";

type InfiniteScrollProps = PropsWithChildren & {
  next: Function;
  currentPage: number;
  isFetching: boolean;
  totalPages: number;
};

const InfiniteScroll = ({
  children,
  next,
  isFetching,
  currentPage,
  totalPages,
}: InfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        !isFetching &&
        currentPage < totalPages
      ) {
        next();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, totalPages]);

  return <>{children}</>;
};

export default InfiniteScroll;
