import {createContext, useContext} from "react";
import {TAssumption, TChat, TChatItemMultiType, TChatSpan, TFact, TGoal, TGuideline} from "../types/dataTypes";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../App";
import {createSpanChainWithItem, aipeReqInstance} from "./utils";

interface IChatCtx {
  chatData?: TChat
  chatId: string
  refreshChat: () => void
  addChatItem: (item: Partial<TChatItemMultiType>) => void
  addNewSpan: (span: Partial<TChatSpan>) => void
}

export const ChatCtx = createContext<IChatCtx>(undefined);

export const useChatCtx = () => {
  return useContext(ChatCtx);
};

export const setChatNestedData = (data: TChat, selfUpdate: boolean = true) => {
  if (selfUpdate) {
    queryClient.setQueryData(['chat', data.id], data);
  }
  data.facts.forEach((fact: TFact) => queryClient.setQueryData(['fact', fact.id], fact));
  data.assumptions.forEach((assumption: TAssumption) => queryClient.setQueryData(['assumption', assumption.id], assumption));
  data.goals.forEach((goal: TGoal) => queryClient.setQueryData(['goal', goal.id], goal));
  data.guidelines.forEach((guideline: TGuideline) => queryClient.setQueryData(['guideline', guideline.id], guideline));
  // data.spans.forEach((span: TChatSpan) => setSpanNestedData(span));
}

export const ChatCtxProvider = (props: { children: React.ReactNode, chatId: string, pauseFetching?: boolean }) => {
  const { data, refetch } = useQuery({
    queryKey: ['chat', props.chatId],
    queryFn: () => aipeReqInstance.get(`contexts/${props.chatId}/`).then((res) => res.data),
    enabled: !!props.chatId && !props.pauseFetching,
    onSuccess: (data) => setChatNestedData(data, false),
  });

  const addChatItem = useMutation({
    mutationFn: (item: Partial<TChatItemMultiType>) => {
      const lastSpanId = data?.spans[data.spans.length - 1];
      return createSpanChainWithItem(lastSpanId.id, item);
    },
    onSuccess: (result, variables, context) => {
      console.log('item added', result);
      const lastSpanId = data?.spans[data.spans.length - 1];
      return queryClient.invalidateQueries(['span', lastSpanId.id]);
    },
  });

  const addNewSpan = useMutation({
    mutationFn: (spanInfo: Partial<TChatSpan>) =>
      aipeReqInstance.post(`contexts/${props.chatId}/spans/`, spanInfo).then((res) => res.data),
    onSuccess: (result, variables, context) => {
      console.log('new span added', result);
      return queryClient.invalidateQueries(['chat', props.chatId]);
    },
  })

  return <ChatCtx.Provider value={{
    chatId: props.chatId,
    chatData: data,
    refreshChat: refetch,
    addChatItem: addChatItem.mutate,
    addNewSpan: addNewSpan.mutate,
  }}>
    {props.children}
  </ChatCtx.Provider>;
}
