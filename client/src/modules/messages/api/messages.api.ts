import { getSocket } from "../../../core/socket";
import { GetChatsDto } from "./dto/get.chats.dto";
import { GetMessagesDto } from "./dto/get.messages.dto";
import { api } from "../../../core/api";

enum EVENTS {
  CHATS = "chats",
  MESSAGES = "messages",
  JOIN_CHAT = "chats:join",
  LEAVE_CHAT = "chats:leave",
}

type CreateChatParams = {
  targetUserId: string;
};

type SendMessageParams = {
  chatId: string;
  content: string;
};

type DeleteMessageParams = {
  chatId: string;
  messageId: string;
};

type EditMessageParams = {
  chatId: string;
  messageId: string;
  content: string;
};

export const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<GetChatsDto, void>({
      query: () => `/chats`,
      onCacheEntryAdded: async (
        args,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) => {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          if (!socket.connected) {
            socket.connect();
          }

          const handleChats = (res: GetChatsDto) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...res);
            });
          };

          socket.on(EVENTS.CHATS, handleChats);

          await cacheEntryRemoved;

          socket.off(EVENTS.CHATS);
          socket.off(EVENTS.MESSAGES);
          socket.disconnect();
        } catch {}
      },
    }),
    createChat: builder.mutation<void, CreateChatParams>({
      query: (body) => ({
        url: "/chats",
        method: "POST",
        body,
      }),
    }),
    deleteChat: builder.mutation<void, string>({
      query: (chatId) => ({
        url: `/chats/${chatId}`,
        method: "DELETE",
      }),
    }),
    getMessages: builder.query<GetMessagesDto, string>({
      query: (chatId) => `/chats/${chatId}/messages`,
      keepUnusedDataFor: 0,
      onCacheEntryAdded: async (
        chatId,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) => {
        try {
          await cacheDataLoaded;

          const socket = getSocket();

          socket.emit(EVENTS.JOIN_CHAT, { chatId });

          const handleMessages = (res: GetMessagesDto) => {
            updateCachedData((draft) => {
              draft.splice(0, draft.length, ...res);
            });
          };

          socket.on(EVENTS.MESSAGES, handleMessages);

          await cacheEntryRemoved;

          socket.emit(EVENTS.LEAVE_CHAT, { chatId });
        } catch {}
      },
    }),
    sendMessage: builder.mutation<void, SendMessageParams>({
      query: ({ chatId, ...body }) => ({
        url: `/chats/${chatId}/messages`,
        method: "POST",
        body,
      }),
    }),
    editMessage: builder.mutation<void, EditMessageParams>({
      query: ({ chatId, messageId, ...body }) => ({
        url: `/chats/${chatId}/messages/${messageId}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteMessage: builder.mutation<void, DeleteMessageParams>({
      query: ({ chatId, messageId }) => ({
        url: `/chats/${chatId}/messages/${messageId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetChatsQuery,
  useCreateChatMutation,
  useDeleteChatMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
} = messagesApi;
