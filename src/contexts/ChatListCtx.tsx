import {createContext, useContext, useState} from "react";
import {TChat} from "../types/dataTypes";
import {aipeReqInstance, createNewChat} from "./utils";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../App";
import {setChatNestedData} from "./ChatCtx";

interface IChatListCtx {
  chatList?: TChat[]
  isLoading: boolean
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
  const { data, isLoading, refetch } = useQuery({
    queryKey: 'chats',
    queryFn: (): Promise<TChat[]> => aipeReqInstance.get('contexts/').then((res) => res.data),
    onSuccess: (chats: TChat[]) => {
      chats.forEach((chat) => {
        queryClient.setQueryData(['chat', chat.id], chat);
        setChatNestedData(chat);
      })
    },
  });

  const firstChatId = data?.[0]?.id;
  const [selectedChatId, setSelectedChatId] = useState<string>(undefined);

  const createChat = useMutation({
    mutationFn: (chat: Partial<TChat>) => createNewChat(chat),
  });

  return <ChatListCtx.Provider value={{
    chatList: data,
    isLoading,
    refreshChatList: refetch,
    selectedChatId: selectedChatId || firstChatId,
    setSelectedChatId,
    createChat: () => createChat.mutate({}),
  }}>
    {props.children}
  </ChatListCtx.Provider>;
}
