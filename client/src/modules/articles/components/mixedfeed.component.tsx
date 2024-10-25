import { useState } from "react";
import { Tab, Tabs } from "../../common/ui";
import UserFeed from "./user.feed.component";
import FollowingFeed from "./following.feed.component";
import { useTranslation } from "react-i18next";

const MixedFeed = () => {
  const [type, setType] = useState<"my" | "following">("my");
  const { t } = useTranslation();

  const handleClickType = (value: "my" | "following") => setType(value);

  return (
    <>
      <div className="px-6 py-2">
        <Tabs>
          <Tab onClick={() => handleClickType("my")} active={type === "my"}>
            {t("userFeedTabs.my")}
          </Tab>
          <Tab
            onClick={() => handleClickType("following")}
            active={type === "following"}
          >
            {t("userFeedTabs.followings")}
          </Tab>
        </Tabs>
      </div>
      {type === "my" ? <UserFeed /> : <FollowingFeed />}
    </>
  );
};

export default MixedFeed;
