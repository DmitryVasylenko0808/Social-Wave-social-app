import { List, ListItem } from "../../common/ui";
import { Chat } from "../api/dto/get.chats.dto";
import ChatItem from "./chat.item";

type ChastListProps = {
  data: Chat[];
  onSelectChat: (chat: Chat) => void;

  current: Chat | null;
};

const ChastList = ({ data, current, onSelectChat }: ChastListProps) => {
  return (
    <div className="h-[calc(100vh-90px-64px)] overflow-y-auto">
      <List className="gap-0">
        {data.map((chat) => (
          <ListItem key={chat._id}>
            <ChatItem
              chat={chat}
              active={current?._id === chat._id}
              onSelect={() => onSelectChat(chat)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChastList;
