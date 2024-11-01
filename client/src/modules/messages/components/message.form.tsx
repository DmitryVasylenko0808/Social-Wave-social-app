import { SendHorizontal } from "lucide-react";
import { TextField, Button } from "../../common/ui";

const MessageForm = () => {
  return (
    <div className="px-4 pt-4 pb-5 shadow-sm border-t border-secondary-50 dark:border-dark-200">
      <form className="flex items-center gap-4">
        <TextField className="flex-auto" placeholder="Type a message" />
        <Button variant="primary" className="min-w-max">
          <SendHorizontal />
        </Button>
      </form>
    </div>
  );
};

export default MessageForm;
