import { useEffect, useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return {
    open,
    onOpen,
    onClose,
  };
};
