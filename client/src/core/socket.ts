import { io, Socket } from "socket.io-client";
import { ServerSocketUrl } from "./constants";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(ServerSocketUrl, {
      autoConnect: false,
      auth: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  return socket;
};
