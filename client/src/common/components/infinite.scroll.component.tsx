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
  totalPages,
}: InfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        !isFetching
      ) {
        next();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  return <>{children}</>;
};

export default InfiniteScroll;
