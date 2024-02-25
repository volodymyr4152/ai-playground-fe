import {createContext, useContext} from "react";
import {TAssumption, TChat, TChatSpan, TFact, TGoal, TGuideline} from "../types/dataTypes";
import {useQuery} from "react-query";
import {queryClient} from "../App";
import {setSpanNestedData} from "./SpanCtx";
import {aipeReqInstance} from "./utils";

interface IChatCtx {
  chatData?: TChat
  chatId: string
  isLoading: boolean
  refreshChat: () => void
}

export const ChatCtx = createContext<IChatCtx>(undefined);

export const useChatCtx = () => {
  return useContext(ChatCtx);
};

export const setChatNestedData = (data: TChat) => {
  data.facts.forEach((fact: TFact) => queryClient.setQueryData(['fact', fact.id], fact));
  data.assumptions.forEach((assumption: TAssumption) => queryClient.setQueryData(['assumption', assumption.id], assumption));
  data.goals.forEach((goal: TGoal) => queryClient.setQueryData(['goal', goal.id], goal));
  data.guidelines.forEach((guideline: TGuideline) => queryClient.setQueryData(['guideline', guideline.id], guideline));
  data.spans.forEach((span: TChatSpan) => {
    queryClient.setQueryData(['span', span.id], span);
    setSpanNestedData(span);
  });
}

export const ChatCtxProvider = (props: { children: React.ReactNode, chatId: string }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['chat', props.chatId],
    queryFn: () => aipeReqInstance.get(`contexts/${props.chatId}/`).then((res) => res.data),
    enabled: !!props.chatId,
    onSuccess: setChatNestedData,
  });
  return <ChatCtx.Provider value={{
    chatId: props.chatId, chatData: data, isLoading: isLoading, refreshChat: refetch,
  }}>
    {props.children}
  </ChatCtx.Provider>;
}
