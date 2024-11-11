import { useTranslation } from "react-i18next";
import { Button } from "../../common/ui";

type MessagesPlaceholderProps = {
  onStartMessaging: () => void;
};

const MessagesPlaceholder = ({
  onStartMessaging,
}: MessagesPlaceholderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex-auto flex justify-center items-center bg-secondary-50 dark:bg-dark-200 max-md:hidden">
      <div>
        <h3 className="mb-4 text-lg font-medium text-secondary-100">
          {t("messages.placeholder.text")}
        </h3>
        <div className="flex justify-center">
          <Button variant="primary" onClick={onStartMessaging}>
            {t("messages.placeholder.btn")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPlaceholder;
