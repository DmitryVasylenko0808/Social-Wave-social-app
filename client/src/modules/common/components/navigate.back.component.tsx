import { useNavigate } from "react-router";
import { ComponentProps } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui";
import { cn } from "../../../utils/cn";

type NavigateBackProps = ComponentProps<"div"> & {
  title?: string;
};

const NavigateBack = ({ title, className }: NavigateBackProps) => {
  const navigate = useNavigate();

  const handleClickBack = () => navigate(-1);

  const classes = cn(
    "sticky top-0 z-10 py-2 px-6 bg-white border-b border-secondary-50 flex items-center gap-3.5 shadow-sm dark:bg-dark-100 dark:border-dark-200",
    className
  );

  return (
    <div className={classes}>
      <Button variant="terciary" onClick={handleClickBack}>
        <ArrowLeft />
      </Button>
      {title && <h2 className="text-xl text-primary-200 font-bold">{title}</h2>}
    </div>
  );
};

export default NavigateBack;
