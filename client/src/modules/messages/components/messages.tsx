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
  useLazyGetMessagesQuery,
} from "../api/messages.api";
import { useEffect, useState } from "react";
import { Message } from "../api/dto/get.messages.dto";
import { useModal } from "../../common/hooks/useModal";
import EditMessageModal from "./modals/edit.message.modal";

type MessagesProps = {
  chat: Chat;
  leaveChat: () => void;
};

const Messages = ({ chat, leaveChat }: MessagesProps) => {
  const { user } = useAuth();
  // const { data } = useGetMessagesQuery(chat._id);
  const [triggerGetMessages, { data }] = useLazyGetMessagesQuery();
  const [triggerDeleteMessage] = useDeleteMessageMutation();

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const editModal = useModal();

  useEffect(() => {
    console.log(chat._id);
    triggerGetMessages(chat._id).unwrap();
  }, [chat._id]);

  const handleClickMessage = (message: Message) => {
    if (message._id === selectedMessage?._id) {
      setSelectedMessage(null);
    } else {
      setSelectedMessage(message);
    }
  };

  const handleClickDeleteMessage = () => {
    if (!selectedMessage) {
      return;
    }

    triggerDeleteMessage({ chatId: chat._id, messageId: selectedMessage._id })
      .unwrap()
      .then(() => {
        setSelectedMessage(null);
      });
  };

  const afterEditMessage = () => {
    editModal.onClose();
    setSelectedMessage(null);
  };

  const participant = chat.members.find((m) => m._id !== user.userId);

  // console.log(selectedMessage);

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
      {selectedMessage && (
        <div className="absolute top-16 left-0 z-10 w-full min-h-16 flex justify-center shadow-sm border-b bg-white border-secondary-50 dark:border-dark-200">
          <div className="flex gap-16">
            <Button variant="tertiary" onClick={handleClickDeleteMessage}>
              <Trash2 />
              Delete
            </Button>
            <Button variant="tertiary" onClick={editModal.onOpen}>
              <PencilLine /> Edit
            </Button>
          </div>
        </div>
      )}
      <div className="flex-1 py-5 overflow-y-auto">
        <List className="gap-0">
          {data?.map((message) => (
            <ListItem key={message._id}>
              <MessageItem
                message={message}
                selected={message._id === selectedMessage?._id}
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
      {selectedMessage && (
        <EditMessageModal
          message={selectedMessage}
          open={editModal.open}
          onClose={editModal.onClose}
          afterEdit={afterEditMessage}
        />
      )}
    </div>
  );
};

export default Messages;
