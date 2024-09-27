import { Ban, Check, Info, X } from "lucide-react";
import { useEffect } from "react";

type AlertProps = {
  type: "info" | "success" | "error";
  message: string;
  onClose: () => void;
};

const Alert = ({ type, message, onClose }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);

    return () => clearTimeout(timer);
  }, []);

  let typeIcon;

  if (type === "success") {
    typeIcon = <Check className="text-primary-200" />;
  } else if (type === "error") {
    typeIcon = <Ban className="text-red-400" />;
  } else {
    typeIcon = <Info className="text-primary-200" />;
  }

  return (
    <div className="relative min-w-80 py-5 px-4 bg-white border rounded-xl shadow-xl flex dark:bg-dark-200 dark:border-0">
      <div className="flex-1 flex items-center gap-4 dark:text-secondary-50">
        {typeIcon} {message}
      </div>
      <X
        className="ml-4 text-secondary-100 cursor-pointer hover:text-secondary-200"
        onClick={onClose}
      />
    </div>
  );
};

export default Alert;
