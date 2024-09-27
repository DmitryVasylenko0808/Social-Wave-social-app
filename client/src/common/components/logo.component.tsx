import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

type LogoProps = ComponentProps<"h1">;

const Logo = ({ className }: LogoProps) => {
  const classes = cn(
    "text-black dark:text-white text-4xl font-bold",
    className
  );

  return (
    <h1 className={classes}>
      <Link to="/">SocialWave</Link>
    </h1>
  );
};

export default Logo;
