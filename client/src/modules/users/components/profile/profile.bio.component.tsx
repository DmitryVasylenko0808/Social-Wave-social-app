import { UserDetails } from "../../../../api/users/dto/get.one.user.dto";

type ProfileBioProps = {
  data?: UserDetails;
};

const ProfileBio = ({ data }: ProfileBioProps) => {
  return <p className="mb-10 dark:text-secondary-200">{data?.bio}</p>;
};

export default ProfileBio;
