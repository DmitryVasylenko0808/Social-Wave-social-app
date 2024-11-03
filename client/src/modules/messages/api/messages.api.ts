import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ServerSocketUrl } from "../../../core/constants";
import { getSocket } from "../../../core/socket";
import { GetChatsDto } from "./dto/get.chats.dto";
import { GetMessagesDto } from "./dto/get.messages.dto";

type SendMessagePayload = {
  userId: string;
  chatId: string;
  content: string;
};

type DeleteMessagePayload = {
  chatId: string;
  messageId: string;
};

type EditMessagePayload = {
  chatId: string;
  messageId: string;
  content: string;
};

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
    getMessages: builder.query<GetMessagesDto, string>({
      queryFn: (chatId) => ({ data: [] }),
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(
        chatId,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.emit("chats:join", { chatId });
          socket.emit("messages:get", { chatId });

          socket.on("messages", (messages: any[]) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...messages);
            });
          });

          await cacheEntryRemoved;

          socket.emit("chats:leave", { chatId });

          socket.off("messages");
        } catch {}
      },
    }),
    sendMessage: builder.mutation<boolean, SendMessagePayload>({
      queryFn: (sendMessagePayload) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit("messages:send", sendMessagePayload);
          resolve({ data: true });
        });
      },
    }),
    deleteMessage: builder.mutation<boolean, DeleteMessagePayload>({
      queryFn: (deleteMessagePayload) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit("messages:delete", deleteMessagePayload);
          resolve({ data: true });
        });
      },
    }),
    editMessage: builder.mutation<boolean, EditMessagePayload>({
      queryFn: (editMessagePayload) => {
        const socket = getSocket();

        return new Promise((resolve) => {
          socket.emit("messages:edit", editMessagePayload);
          resolve({ data: true });
        });
      },
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
} = messagesApi;
