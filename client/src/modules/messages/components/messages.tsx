import {
  ArrowLeft,
  EllipsisVertical,
  Pencil,
  PencilLine,
  Trash,
  Trash2,
} from "lucide-react";
import { Button, List, ListItem } from "../../common/ui";
import MessageForm from "./message.form";
import MessageItem from "./message.item";
import { Chat } from "../api/dto/get.chats.dto";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  useDeleteMessageMutation,
  useGetMessagesQuery,
} from "../api/messages.api";
import { useState } from "react";
import { Message } from "../api/dto/get.messages.dto";

type MessagesProps = {
  chat: Chat;
  leaveChat: () => void;
};

const Messages = ({ chat, leaveChat }: MessagesProps) => {
  const { user } = useAuth();
  const { data } = useGetMessagesQuery(chat._id);
  const [triggerDeleteMessage] = useDeleteMessageMutation();

  const [selectedMessageId, setSelectedMessageId] = useState<string>("");

  const handleClickMessage = (message: Message) => {
    if (message._id === selectedMessageId) {
      setSelectedMessageId("");
    } else {
      setSelectedMessageId(message._id);
    }
  };

  const handleClickDeleteMessage = () => {
    if (!selectedMessageId) {
      return;
    }

    triggerDeleteMessage({ chatId: chat._id, messageId: selectedMessageId })
      .unwrap()
      .then(() => {
        setSelectedMessageId("");
      });
  };

  const participant = chat.members.find((m) => m._id !== user.userId);

  console.log(selectedMessageId);

  return (
    <div className="relative flex-auto flex flex-col">
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
      {selectedMessageId && (
        <div className="absolute top-16 left-0 z-10 w-full min-h-16 flex justify-center shadow-sm border-b bg-white border-secondary-50 dark:border-dark-200">
          <div className="flex gap-16">
            <Button variant="tertiary" onClick={handleClickDeleteMessage}>
              <Trash2 />
              Delete
            </Button>
            <Button variant="tertiary">
              <PencilLine /> Edit
            </Button>
          </div>
        </div>
      )}
      <div className="flex-1 py-5 overflow-y-scroll">
        <List className="gap-0">
          {data?.map((message) => (
            <ListItem key={message._id}>
              <MessageItem
                message={message}
                selected={message._id === selectedMessageId}
                variant={user.userId === message.user._id ? "user" : "other"}
                onClick={
                  user.userId === message.user._id
                    ? () => handleClickMessage(message)
                    : undefined
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
      <MessageForm chatId={chat._id} />
    </div>
  );
};

export default Messages;
