import {createContext, useContext} from "react";
import {TChat} from "../types/contextTypes";
import axios from "axios";
import {useQuery} from "react-query";

interface IChatCtx {
  chatData?: TChat
  chatId: string
  isLoading: boolean
  refreshChat: () => void
}

export const ChatCtx = createContext<IChatCtx>(undefined);
const aipeReqInstance = axios.create({baseURL: 'http://localhost:3000/api/aipe/', timeout: 3000,});

export const useChatCtx = () => {
  return useContext(ChatCtx);
};


export const ChatCtxProvider = (props: { children: React.ReactNode, chatId: string }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['chat', props.chatId],
    queryFn: () => aipeReqInstance.get(`contexts/${props.chatId}`).then((res) => res.data),
  });
  return <ChatCtx.Provider value={{
    chatId: props.chatId, chatData: data, isLoading: isLoading, refreshChat: refetch,
  }}>
    {props.children}
  </ChatCtx.Provider>;
}
