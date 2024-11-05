import { useTranslation } from "react-i18next";
import { Button } from "../../common/ui";
import { PencilLine, Trash2 } from "lucide-react";

type MessagesActionsProps = {
  onDeleteMessage: () => void;
  onEditMessage: () => void;
};

const MessagesActions = ({
  onDeleteMessage,
  onEditMessage,
}: MessagesActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="absolute top-16 left-0 z-10 w-full min-h-16 flex justify-center shadow-sm border-b bg-white border-secondary-50 dark:bg-dark-100 dark:border-dark-200">
      <div className="flex gap-16">
        <Button variant="tertiary" onClick={onDeleteMessage}>
          <Trash2 />
          {t("messages.actions.delete")}
        </Button>
        <Button variant="tertiary" onClick={onEditMessage}>
          <PencilLine /> {t("messages.actions.edit")}
        </Button>
      </div>
    </div>
  );
};

export default MessagesActions;
