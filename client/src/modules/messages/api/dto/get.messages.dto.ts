import { User } from "../../../users/api/dto/get.users.dto";

export type Message = {
  _id: string;
  chat: string;
  content: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};

export type GetMessagesDto = Message[];
