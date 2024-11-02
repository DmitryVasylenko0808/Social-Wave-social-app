import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerSocketUrl } from "../../../core/constants";
import { getSocket } from "../../../core/socket";
import { GetChatsDto } from "./dto/get.chats.dto";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ServerSocketUrl,
  }),
  endpoints: (builder) => ({
    getChats: builder.query<GetChatsDto, string>({
      queryFn: (userId) => ({
        data: [],
      }),
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(
        userId,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          if (!socket.connected) {
            socket.connect();
          }

          socket.on("connect", () => {
            console.log(userId, "connected");
            socket.emit("chats:get", { userId });
          });

          socket.on("chats", (chats: GetChatsDto) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...chats);
            });
          });

          await cacheEntryRemoved;

          socket.off("connect");
          socket.off("chats");

          socket.disconnect();
        } catch {}
      },
    }),
  }),
});

export const { useGetChatsQuery } = messagesApi;
