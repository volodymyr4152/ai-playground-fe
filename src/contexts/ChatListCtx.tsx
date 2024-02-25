import {createContext, useContext} from "react";
import {TChat} from "../types/dataTypes";
import {aipeReqInstance} from "./utils";
import {useQuery} from "react-query";
import {queryClient} from "../App";
import {setChatNestedData} from "./ChatCtx";

interface IChatListCtx {
  chatList?: TChat[]
  isLoading: boolean
  refreshChatList: () => void
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

  return <ChatListCtx.Provider value={{
    chatList: data, isLoading: isLoading, refreshChatList: refetch
  }}>
    {props.children}
  </ChatListCtx.Provider>;
}
