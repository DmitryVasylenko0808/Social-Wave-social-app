import { List, ListItem } from "../../common/ui";
import ChatItem from "./chat.item";

const ChastList = () => {
  return (
    <div className="h-[calc(100vh-90px-64px)] overflow-y-scroll">
      <div className="p-4">
        <List className="gap-8">
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
    </div>
  );
};

export default ChastList;
