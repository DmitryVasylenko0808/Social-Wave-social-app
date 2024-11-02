import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { Button, List, ListItem } from "../../common/ui";
import MessageForm from "./message.form";
import MessageItem from "./message.item";
import { Chat } from "../api/dto/get.chats.dto";
import { useAuth } from "../../auth/hooks/useAuth";
import { useGetMessagesQuery } from "../api/messages.api";

type MessagesProps = {
  chat: Chat;
  leaveChat: () => void;
};

const Messages = ({ chat, leaveChat }: MessagesProps) => {
  const { user } = useAuth();
  const { data } = useGetMessagesQuery(chat._id);

  const participant = chat.members.find((m) => m._id !== user.userId);

  return (
    <div className="flex-auto flex flex-col">
      <div className="min-h-16 px-4 flex justify-between items-center shadow-sm border-b border-secondary-50 dark:border-dark-200">
        <div className="flex items-center gap-4">
          <Button onClick={leaveChat} variant="tertiary">
            <ArrowLeft />
          </Button>
          <h3 className="text-lg font-bold">
            {participant?.firstName} {participant?.secondName}
          </h3>
        </div>
        <Button variant="tertiary">
          <EllipsisVertical />
        </Button>
      </div>
      <div className="flex-1 px-4 py-5 overflow-y-scroll">
        <List className="gap-4">
          {data?.map((message) => (
            <ListItem key={message._id}>
              <MessageItem
                variant={user.userId === message.user._id ? "user" : "other"}
                message={message}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <MessageForm />
    </div>
  );
};

export default Messages;
