import { userAvatarsUrl } from "../../api/constants";
import { UserDetails } from "../../api/users/dto/get.one.user.dto";
import { Avatar } from "../../common/ui";

type ProfileInfoProps = {
  data?: UserDetails;
};

const ProfileInfo = ({ data }: ProfileInfoProps) => {
  return (
    <div className="flex items-center gap-5">
      <Avatar
        className="border-4 border-white"
        variant="big"
        src={
          data?.avatar
            ? `${userAvatarsUrl}/${data.avatar}`
            : `${userAvatarsUrl}/nullavatar.jpg`
        }
        alt={`Avatar ${data?.firstName} ${data?.secondName}`}
      />
      <h2 className="pt-5 text-xl text-primary-200 font-bold">
        {data?.firstName} {data?.secondName}
      </h2>
    </div>
  );
};

export default ProfileInfo;
