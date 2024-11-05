import { useEffect, useState } from "react";
import {
  useDeleteMessageMutation,
  useGetMessagesQuery,
} from "../api/messages.api";
import { useModal } from "../../common/hooks/useModal";
import { useAlerts } from "../../common/hooks/useAlerts";
import { Loader } from "../../common/ui";
import MessagesHeader from "./messages.header";
import MessagesActions from "./messages.actions";
import MessagesList from "./messages.list";
import MessageForm from "./message.form";
import EditMessageModal from "./modals/edit.message.modal";
import { Chat } from "../api/dto/get.chats.dto";
import { Message } from "../api/dto/get.messages.dto";

type MessagesProps = {
  chat: Chat;
  onLeaveChat: () => void;
  onDeleteChat: () => void;
};

const Messages = ({ chat, onLeaveChat, onDeleteChat }: MessagesProps) => {
  const editModal = useModal();
  const alerts = useAlerts();
  const { data, isFetching } = useGetMessagesQuery(chat._id);
  const [triggerDeleteMessage] = useDeleteMessageMutation();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    setSelectedMessage(null);
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
      .then(() => setSelectedMessage(null))
      .catch((err) => alerts.error(err.data.message));
  };

  const afterEditMessage = () => {
    editModal.onClose();
    setSelectedMessage(null);
  };

  return (
    <div className="relative flex-auto flex flex-col">
      <MessagesHeader
        chat={chat}
        onLeaveChat={onLeaveChat}
        onDeleteChat={onDeleteChat}
      />
      {selectedMessage && (
        <MessagesActions
          onDeleteMessage={handleClickDeleteMessage}
          onEditMessage={editModal.onOpen}
        />
      )}
      <div className="flex-1 py-5 overflow-y-auto">
        {isFetching ? (
          <Loader position="center" className="h-full items-center" />
        ) : (
          <MessagesList
            data={data || []}
            selectedMessage={selectedMessage}
            onClickMessages={handleClickMessage}
          />
        )}
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
