import {createContext, useContext, useState} from "react";
import {TChat} from "../types/dataTypes";
import {useMutation} from "@tanstack/react-query";
import {aipeReqInstance} from "../utils";
import {useChatListQuery} from "../hooks/useChatsApi";


interface IChatListCtx {
  chatList?: TChat[]
  refreshChatList: () => void
  selectedChatId?: string
  setSelectedChatId: (id: string) => void
  createChat: () => void
}

export const ChatListCtx = createContext<IChatListCtx>(undefined);

export const useChatListCtx = () => {
  return useContext(ChatListCtx);
}

export const ChatListCtxProvider = (props: { children: React.ReactNode }) => {
  const { data, refetch } = useChatListQuery()

  const firstChatId = data?.[0]?.id;
  // const firstChatId = "b665a26d-a499-44f1-8437-89c2e6db2587";
  const [selectedChatId, setSelectedChatId] = useState<string>(undefined);

  const createChat = useMutation({
    mutationFn: (chat: Partial<TChat>) => aipeReqInstance.post('contexts/', chat),
  });

  return <ChatListCtx.Provider value={{
    chatList: data,
    refreshChatList: refetch,
    selectedChatId: selectedChatId || firstChatId,
    setSelectedChatId,
    createChat: () => createChat.mutate({}),
  }}>
    {props.children}
  </ChatListCtx.Provider>;
}
