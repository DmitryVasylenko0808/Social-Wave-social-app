import {
  useCreateChatMutation,
  useDeleteChatMutation,
  useGetChatsQuery,
} from "../api/messages.api";
import { useState } from "react";
import { useModal } from "../../common/hooks/useModal";
import { useAlerts } from "../../common/hooks/useAlerts";
import { useTranslation } from "react-i18next";
import ChastList from "./chats.list";
import Messages from "./messages";
import MessagesPlaceholder from "./messages.placeholder";
import CreateChatModal from "./modals/create.chat.modal";
import { Button, Loader } from "../../common/ui";
import { MailPlus } from "lucide-react";
import { Chat } from "../api/dto/get.chats.dto";

const MessagingSystem = () => {
  const alerts = useAlerts();
  const modal = useModal();
  const { data, isLoading } = useGetChatsQuery();
  const [triggerCreateChat] = useCreateChatMutation();
  const [triggerDeleteChat] = useDeleteChatMutation();
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const { t } = useTranslation();

  const handleSelectChat = (chat: Chat) => setCurrentChat(chat);
  const handleLeaveChat = () => setCurrentChat(null);

  const handleClickCreateChat = (targetUserId: string) => {
    triggerCreateChat({ targetUserId })
      .unwrap()
      .then(() => {
        modal.onClose();
      })
      .catch((err) => alerts.error(err.data.message));
  };

  const handleClickDeleteChat = () => {
    if (!currentChat) {
      return;
    }

    triggerDeleteChat(currentChat._id)
      .unwrap()
      .then(() => setCurrentChat(null))
      .catch(() => alerts.error("Oops... something went wrong"));
  };

  return (
    <div className="h-[calc(100vh-90px)] flex">
      <div className="min-w-[400px] border-r border-secondary-50 dark:border-dark-200">
        <div className="h-16 px-4 flex justify-between items-center shadow-sm border-b border-secondary-50 dark:border-dark-200">
          <h2 className="text-xl font-bold dark:text-white">
            {t("messages.title")}
          </h2>
          <Button
            onClick={modal.onOpen}
            variant="tertiary"
            className="text-primary-100 hover:text-primary-300"
          >
            <MailPlus />
          </Button>
        </div>
        {isLoading ? (
          <Loader position="center" className="py-5" />
        ) : (
          <ChastList
            data={data || []}
            current={currentChat}
            onSelectChat={handleSelectChat}
          />
        )}
      </div>
      {currentChat ? (
        <Messages
          chat={currentChat}
          onLeaveChat={handleLeaveChat}
          onDeleteChat={handleClickDeleteChat}
        />
      ) : (
        <MessagesPlaceholder onStartMessaging={modal.onOpen} />
      )}
      <CreateChatModal
        open={modal.open}
        onClose={modal.onClose}
        onCreateChat={handleClickCreateChat}
      />
    </div>
  );
};

export default MessagingSystem;
