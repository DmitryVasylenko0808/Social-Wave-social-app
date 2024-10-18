import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router";

type ScrollToTopProps = PropsWithChildren;

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.startsWith("/article")) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return children;
};

export default ScrollToTop;
