import { ArrowLeft } from "lucide-react";
import { Button } from "../ui";
import { useNavigate } from "react-router";

type NavigateBackProps = {
  title?: string;
};

const NavigateBack = ({ title }: NavigateBackProps) => {
  const navigate = useNavigate();

  const handleClickBack = () => navigate(-1);

  return (
    <div className="mb-10 flex items-center gap-3.5">
      <Button variant="terciary" onClick={handleClickBack}>
        <ArrowLeft />
      </Button>
      {title && <h2 className="text-xl text-primary-200 font-bold">{title}</h2>}
    </div>
  );
};

export default NavigateBack;
