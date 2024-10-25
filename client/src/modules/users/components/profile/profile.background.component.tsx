import { ArrowLeft } from "lucide-react";
import { UserDetails } from "../../api/dto/get.one.user.dto";
import { Button } from "../../../common/ui";
import { userAvatarsUrl } from "../../../../core/constants";
import { useNavigate } from "react-router";

type ProfileBackgroundProps = {
  data?: UserDetails;
};

const ProfileBackground = ({ data }: ProfileBackgroundProps) => {
  const navigate = useNavigate();

  const handleClickBack = () => navigate(-1);

  return (
    <div
      style={{
        backgroundImage: `url(${userAvatarsUrl}/${data!.coverImage})`,
      }}
      className="h-cover bg-blue-50 bg-cover bg-center dark:bg-dark-300"
    >
      <div className="py-2 px-6 hover:bg-black/50">
        <div className="flex items-center gap-3.5">
          <Button variant="tertiary" onClick={handleClickBack}>
            <ArrowLeft />
          </Button>
          <h2 className="text-xl text-primary-200 font-bold">
            {data?.firstName} {data?.secondName}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileBackground;
