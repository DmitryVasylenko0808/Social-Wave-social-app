import { ArrowLeft } from "lucide-react";
import { UserDetails } from "../../api/users/dto/get.one.user.dto";
import { Button } from "../../common/ui";
import { userAvatarsUrl } from "../../api/constants";
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
      className="h-cover bg-blue-50 bg-cover bg-center"
    >
      <div className="pt-2 px-6">
        <div className="flex items-center gap-3.5">
          <Button variant="terciary" onClick={handleClickBack}>
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
