import { User } from "../../../users/api/dto/get.users.dto";

export type Chat = {
  _id: string;
  members: User[];
};

export type GetChatsDto = Chat[];
