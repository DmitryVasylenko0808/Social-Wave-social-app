import React from "react";
import { User } from "../../api/users/dto/get.users.dto";
import { Link } from "react-router-dom";

type UserItemProps = {
  data: User;
};

const UserItem = ({ data }: UserItemProps) => {
  return (
    <div className="py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to={`/${data._id}/profile`}>
          <div className="w-[50px] h-[50px] bg-slate-600 rounded-full" />
        </Link>
        <Link to={`/${data._id}/profile`}>
          <span className="text-secondary-300 font-medium">
            {data.firstName} {data.secondName}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
