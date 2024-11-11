import { ComponentProps } from "react";
import Button from "./button.component";
import { X } from "lucide-react";
import { Portal } from "../components";
import { cn } from "../../../utils/cn";

export type ModalProps = ComponentProps<"div"> & {
  open: boolean;
  title?: string;

  onClose: () => void;
};

const Modal = ({ open, title, children, className, onClose }: ModalProps) => {
  if (!open) {
    return null;
  }

  const modalClasses = cn(
    "max-h-[800px] p-5 shadow-xl bg-white rounded-xl scrollbar-custom overflow-auto dark:bg-dark-200",
    className
  );

  return (
    <Portal targetId="modals-root">
      <div className="w-full min-h-screen fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center">
        <div className={modalClasses}>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-black text-xl font-bold dark:text-white">
              {title}
            </span>
            <Button variant="tertiary" onClick={onClose}>
              <X />
            </Button>
          </div>
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
