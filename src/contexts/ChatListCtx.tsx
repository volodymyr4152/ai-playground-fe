import {createContext, useContext, useState} from "react";
import {TChat} from "../types/dataTypes";
import {aipeReqInstance, QKP} from "./utils";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../App";
import {setChatNestedData} from "./ChatCtx";

interface IChatListCtx {
  chatList?: TChat[]
  isLoading: boolean,
  isFetching: boolean,
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
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: QKP.chatList,
    queryFn: (): Promise<TChat[]> => aipeReqInstance.get('contexts/').then((res) => res.data),
    onSuccess: (chats: TChat[]) => {chats.forEach((chat) => setChatNestedData(chat))},
    staleTime: 1000 * 60 * 10,
  });

  const firstChatId = data?.[0]?.id;
  // const firstChatId = "b665a26d-a499-44f1-8437-89c2e6db2587";
  const [selectedChatId, setSelectedChatId] = useState<string>(undefined);

  const createChat = useMutation({
    mutationFn: (chat: Partial<TChat>) => aipeReqInstance.post('contexts/', chat),
  });

  return <ChatListCtx.Provider value={{
    chatList: data,
    isLoading,
    isFetching,
    refreshChatList: refetch,
    selectedChatId: selectedChatId || firstChatId,
    setSelectedChatId,
    createChat: () => createChat.mutate({}),
  }}>
    {props.children}
  </ChatListCtx.Provider>;
}
