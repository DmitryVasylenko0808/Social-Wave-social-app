import { MailPlus } from "lucide-react";
import { Button } from "../../common/ui";
import ChastList from "./chats.list";
import Messages from "./messages";
import MessagesPlaceholder from "./messages.placeholder";
import { useGetChatsQuery } from "../api/messages.api";
import { useAuth } from "../../auth/hooks/useAuth";
import { useState } from "react";
import { Chat } from "../api/dto/get.chats.dto";
import { useModal } from "../../common/hooks/useModal";
import CreateChatModal from "./modals/create.chat.modal";

const MessagingSystem = () => {
  const { user } = useAuth();
  const { data } = useGetChatsQuery(user.userId as string);

  const modal = useModal();

  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const handleSelectChat = (chat: Chat) => setCurrentChat(chat);
  const handleLeaveChat = () => setCurrentChat(null);

  return (
    <>
      <div className="h-[calc(100vh-90px)] flex">
        <div className="min-w-[400px] border-r border-secondary-50 dark:border-dark-200">
          <div className="h-16 px-4 flex justify-between items-center shadow-sm border-b border-secondary-50 dark:border-dark-200">
            <h2 className="text-xl font-bold">Messages</h2>
            <Button
              onClick={modal.onOpen}
              variant="tertiary"
              className="text-primary-100 hover:text-primary-300"
            >
              <MailPlus />
            </Button>
          </div>
          <ChastList
            data={data || []}
            current={currentChat}
            onSelectChat={handleSelectChat}
          />
        </div>

        {currentChat ? (
          <Messages chat={currentChat} leaveChat={handleLeaveChat} />
        ) : (
          <MessagesPlaceholder />
        )}
      </div>
      <CreateChatModal open={modal.open} onClose={modal.onClose} />
    </>
  );
};

export default MessagingSystem;
