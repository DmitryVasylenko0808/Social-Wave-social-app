import { Link } from "react-router-dom";
import { UserDetails } from "../../api/users/dto/get.one.user.dto";
import { Trans } from "react-i18next";

type ProfileStatsProps = {
  data?: UserDetails;
};

const ProfileStats = ({ data }: ProfileStatsProps) => {
  return (
    <div className="flex gap-7">
      <Trans
        i18nKey="profile.stats.followers"
        count={data?.followers.length || 0}
        components={{
          CustomLink: (
            <Link
              to={`/users/${data?._id}/followers`}
              className="px-2 text-secondary-300 text-lg inline-flex gap-2 dark:text-secondary-100"
            />
          ),
          span: <span className="text-primary-200 font-medium" />,
        }}
      />
      <Trans
        i18nKey="profile.stats.followings"
        count={data?.followings.length || 0}
        components={{
          CustomLink: (
            <Link
              to={`/users/${data?._id}/followings`}
              className="px-2 text-secondary-300 text-lg inline-flex gap-2 dark:text-secondary-100"
            />
          ),
          span: <span className="text-primary-200 font-medium" />,
        }}
      />
    </div>
  );
};

export default ProfileStats;
