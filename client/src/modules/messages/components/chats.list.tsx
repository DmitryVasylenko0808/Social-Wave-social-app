import { List, ListItem } from "../../common/ui";
import ChatItem from "./chat.item";

const ChastList = () => {
  return (
    <div className="h-[calc(100vh-90px-64px)] overflow-y-scroll">
      <List className="gap-0">
        <ListItem>
          <ChatItem />
        </ListItem>
        <ListItem>
          <ChatItem />
        </ListItem>
        <ListItem>
          <ChatItem />
        </ListItem>
        <ListItem>
          <ChatItem />
        </ListItem>
        <ListItem>
          <ChatItem />
        </ListItem>
        <ListItem>
          <ChatItem />
        </ListItem>
        <ListItem>
          <ChatItem />
        </ListItem>
        <ListItem>
          <ChatItem />
        </ListItem>
        <ListItem>
          <ChatItem />
        </ListItem>
        <ListItem>
          <ChatItem />
        </ListItem>
        <ListItem>
          <ChatItem />
        </ListItem>
      </List>
    </div>
  );
};

export default ChastList;
