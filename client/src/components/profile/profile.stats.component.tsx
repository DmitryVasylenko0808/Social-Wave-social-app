import { Link } from "react-router-dom";
import { UserDetails } from "../../api/users/dto/get.one.user.dto";

type ProfileStatsProps = {
  data?: UserDetails;
};

const ProfileStats = ({ data }: ProfileStatsProps) => {
  return (
    <div className="flex gap-7">
      <Link
        to={`/users/${data?._id}/followers`}
        className="px-2 text-secondary-300 text-lg inline-flex gap-2"
      >
        <span className="text-primary-200 font-medium">
          {data?.followers.length || 0}
        </span>{" "}
        followers
      </Link>
      <Link
        to={`/users/${data?._id}/followings`}
        className="px-2 text-secondary-300 text-lg inline-flex gap-2"
      >
        <span className="text-primary-200 font-medium">
          {data?.followings.length || 0}
        </span>{" "}
        followings
      </Link>
    </div>
  );
};

export default ProfileStats;
