import { PropsWithChildren, useEffect, useRef } from "react";
import { Loader } from "../ui";

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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const hasMore = currentPage < totalPages;

      if (entries[0].isIntersecting && !isFetching && hasMore) {
        next();
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [isFetching]);

  return (
    <>
      {children}
      {isFetching && <Loader className="py-6" position="center" />}
      <div className="h-2" ref={bottomRef}></div>
    </>
  );
};

export default InfiniteScroll;
