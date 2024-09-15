import { cn } from "../../utils/cn";

type LoaderProps = {
  position?: "start" | "center" | "end";
  variant?: "primary" | "secondary";
  size?: "small" | "big";
  className?: string;
};

const Loader = ({
  position = "start",
  variant = "primary",
  size = "big",
  className,
}: LoaderProps) => {
  const parentClasses = cn(
    "flex",
    {
      "justify-start": position === "start",
      "justify-center": position === "center",
      "justify-end": position === "end",
    },
    className
  );

  const loaderClasses = cn(
    "rounded-full animate-spin",
    {
      "w-[21px] h-[21px] border-2": size === "small",
      "w-12 h-12 border-4": size === "big",
      "border-primary-200": variant === "primary",
      "border-white": variant === "secondary",
    },
    "border-r-transparent"
  );

  return (
    <div className={parentClasses}>
      <div className={loaderClasses} />
    </div>
  );
};

export default Loader;
