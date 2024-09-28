import { ChevronDown } from "lucide-react";
import { forwardRef, PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

type SelectProps = PropsWithChildren & {
  open: boolean;
  value?: any;
  text?: string;
  label?: string;
  className?: string;

  onOpen: () => void;
};

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ open, value, text, label, className, children, onOpen }, ref) => {
    const classes = cn("relative flex flex-col", className);

    return (
      <div className={classes} ref={ref}>
        <label className="mb-1.5 text-label text-sm">{label}</label>
        <div
          className="w-full py-[8.5px] px-2.5 inline-flex items-center justify-between 
        bg-labelFill border border-textFieldBorder rounded text-xl cursor-pointer
        dark:bg-dark-200 dark:border-dark-300 dark:text-secondary-50"
          onClick={onOpen}
        >
          <span>{text}</span>
          <ChevronDown />
        </div>
        {open && (
          <ul className="absolute top-[110%] left-0 w-full py-3 shadow-xl border border-textFieldBorder rounded-2xl flex flex-col dark:border-dark-300 dark:bg-dark-200">
            {children}
          </ul>
        )}
      </div>
    );
  }
);

export default Select;
