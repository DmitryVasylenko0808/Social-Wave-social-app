import { MailPlus } from "lucide-react";
import { Button } from "../../common/ui";
import ChastList from "./chats.list";
import Messages from "./messages";

const MessagingSystem = () => {
  return (
    <div className="h-[calc(100vh-90px)] flex">
      <div className="min-w-[400px] border-r border-secondary-50 dark:border-dark-200">
        <div className="h-16 px-4 flex justify-between items-center shadow-sm border-b border-secondary-50 dark:border-dark-200">
          <h2 className="text-xl font-bold">Messages</h2>
          <Button
            variant="tertiary"
            className="text-primary-100 hover:text-primary-300"
          >
            <MailPlus />
          </Button>
        </div>
        <ChastList />
      </div>

      <Messages />
    </div>
  );
};

export default MessagingSystem;
