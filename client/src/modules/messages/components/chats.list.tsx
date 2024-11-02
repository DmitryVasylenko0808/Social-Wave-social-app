import { List, ListItem } from "../../common/ui";
import { Chat } from "../api/dto/get.chats.dto";
import ChatItem from "./chat.item";

type ChastListProps = {
  data: Chat[];
  onSelectChat: (id: string) => void;

  current?: string;
};

const ChastList = ({ data, current, onSelectChat }: ChastListProps) => {
  return (
    <div className="h-[calc(100vh-90px-64px)] overflow-y-scroll">
      <List className="gap-0">
        {data.map((chat) => (
          <ListItem key={chat._id}>
            <ChatItem
              chat={chat}
              active={current === chat._id}
              onSelect={() => onSelectChat(chat._id)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChastList;
