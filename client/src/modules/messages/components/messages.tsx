import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { Button, List, ListItem } from "../../common/ui";
import MessageForm from "./message.form";
import MessageItem from "./message.item";

const Messages = () => {
  return (
    <div className="flex-auto flex flex-col">
      <div className="min-h-16 px-4 flex justify-between items-center shadow-sm border-b border-secondary-50 dark:border-dark-200">
        <div className="flex items-center gap-4">
          <Button variant="tertiary">
            <ArrowLeft />
          </Button>
          <h3 className="text-lg font-bold">Lorem Ipsum</h3>
        </div>
        <Button variant="tertiary">
          <EllipsisVertical />
        </Button>
      </div>
      <div className="flex-1 px-4 py-5 overflow-y-scroll">
        <List className="gap-4">
          <ListItem>
            <MessageItem variant="other" />
          </ListItem>
          <ListItem>
            <MessageItem variant="user" />
          </ListItem>
          <ListItem>
            <MessageItem variant="other" />
          </ListItem>
          <ListItem>
            <MessageItem variant="user" />
          </ListItem>
          <ListItem>
            <MessageItem variant="other" />
          </ListItem>
          <ListItem>
            <MessageItem variant="user" />
          </ListItem>
          <ListItem>
            <MessageItem variant="other" />
          </ListItem>
          <ListItem>
            <MessageItem variant="user" />
          </ListItem>
          <ListItem>
            <MessageItem variant="other" />
          </ListItem>
          <ListItem>
            <MessageItem variant="user" />
          </ListItem>
          <ListItem>
            <MessageItem variant="other" />
          </ListItem>
          <ListItem>
            <MessageItem variant="user" />
          </ListItem>
          <ListItem>
            <MessageItem variant="other" />
          </ListItem>
          <ListItem>
            <MessageItem variant="user" />
          </ListItem>
        </List>
      </div>
      <MessageForm />
    </div>
  );
};

export default Messages;
