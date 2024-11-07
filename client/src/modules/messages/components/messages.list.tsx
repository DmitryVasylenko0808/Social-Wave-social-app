import { useAuth } from "../../auth/hooks/useAuth";
import { List, ListItem } from "../../common/ui";
import MessageItem from "./message.item";
import { GetMessagesDto, Message } from "../api/dto/get.messages.dto";
import { useEffect, useRef } from "react";

type MessagesListProps = {
  data: GetMessagesDto;
  selectedMessage: Message | null;
  onClickMessages: (message: Message) => void;
};

const MessagesList = ({
  data,
  selectedMessage,
  onClickMessages,
}: MessagesListProps) => {
  const { user } = useAuth();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <>
      <List className="gap-0">
        {data?.map((message) => (
          <ListItem key={message._id}>
            <MessageItem
              message={message}
              selected={message._id === selectedMessage?._id}
              variant={user.userId === message.user._id ? "user" : "other"}
              onClick={
                user.userId === message.user._id
                  ? () => onClickMessages(message)
                  : undefined
              }
            />
          </ListItem>
        ))}
      </List>
      <div ref={endRef} />
    </>
  );
};

export default MessagesList;
