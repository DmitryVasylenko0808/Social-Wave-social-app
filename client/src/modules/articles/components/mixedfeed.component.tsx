import { useState } from "react";
import { Tab, Tabs } from "../../common/ui";
import UserFeed from "./user.feed.component";
import FollowingFeed from "./following.feed.component";

const MixedFeed = () => {
  const [type, setType] = useState<"my" | "following">("my");

  const handleClickType = (value: "my" | "following") => setType(value);

  return (
    <>
      <div className="px-6 py-2">
        <Tabs>
          <Tab onClick={() => handleClickType("my")} active={type === "my"}>
            My
          </Tab>
          <Tab
            onClick={() => handleClickType("following")}
            active={type === "following"}
          >
            Following
          </Tab>
        </Tabs>
      </div>
      {type === "my" ? <UserFeed /> : <FollowingFeed />}
    </>
  );
};

export default MixedFeed;
