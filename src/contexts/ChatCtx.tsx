import {createContext, useCallback, useContext, useMemo} from "react";
import {TAssumption, TChat, TChatItemMultiType, TChatSpan, TFact, TGoal, TGuideline} from "../types/dataTypes";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../App";
import {aipeReqInstance, QKP} from "./utils";

interface IChatCtx {
  chatData?: TChat
  chatId: string
  addChatItem: (item: Partial<TChatItemMultiType>) => void
  addNewSpan: (span: Partial<TChatSpan>) => void
}

export const ChatCtx = createContext<IChatCtx>(undefined);

export const useChatCtx = () => {
  return useContext(ChatCtx);
};

export const setChatNestedData = (data: TChat, selfUpdate: boolean = true) => {
  if (selfUpdate) {
    queryClient.setQueryData([QKP.chat, data.id], data);
  }
  data.facts.forEach((fact: TFact) => queryClient.setQueryData([QKP.fact, fact.id], fact));
  data.assumptions.forEach((assumption: TAssumption) => queryClient.setQueryData([QKP.assumption, assumption.id], assumption));
  data.goals.forEach((goal: TGoal) => queryClient.setQueryData([QKP.goal, goal.id], goal));
  data.guidelines.forEach((guideline: TGuideline) => queryClient.setQueryData([QKP.guideline, guideline.id], guideline));
  data?.spans.forEach((span: TChatSpan) => {
    queryClient.setQueryData([QKP.span, span.id], span);
    span.call_chains.forEach((chain) => {
      queryClient.setQueryData([QKP.chain, chain.id], chain);
      chain.items.forEach((item) => queryClient.setQueryData([QKP.chainItem, item.id], item));
    });
  });
}

export const ChatCtxProvider = (props: { children: React.ReactNode, chatId: string }) => {
  const chatApiFn = useCallback(
    () => aipeReqInstance.get(`contexts/${props.chatId}/`).then((res) => res.data),
    [props.chatId]
  );
  const chatApiCallSuccess = useCallback(
    (data) => setChatNestedData(data, false),
    []
  );

  const { data } = useQuery({
    queryKey: [QKP.chat, props.chatId],
    queryFn: chatApiFn,
    enabled: !!props.chatId,
    onSuccess: chatApiCallSuccess,
    notifyOnChangeProps: ['data']
  });

  const addChatItemApiFn = useCallback(
    (item: Partial<TChatItemMultiType>) => {
      const lastSpanId = data?.spans[data.spans.length - 1];
      return aipeReqInstance.post(`spans/${lastSpanId.id}/chains/`, {"items": [item]}).then((res) => res.data);
    }, [data]
  );

  const addChatItemSuccessFn = useCallback(
    (result, variables, context) => {
      console.log('item added', result);
      const lastSpanId = data?.spans[data.spans.length - 1];
      return queryClient.invalidateQueries([QKP.span, lastSpanId.id]);
    }, [data]
  );

  const addChatItem = useMutation({
    mutationFn: addChatItemApiFn,
    onSuccess: addChatItemSuccessFn,
  });

  const addNewSpan = useMutation({
    mutationFn: (spanInfo: Partial<TChatSpan>) =>
      aipeReqInstance.post(`contexts/${props.chatId}/spans/`, spanInfo).then((res) => res.data),
    onSuccess: (result, variables, context) => {
      console.log('new span added', result);
      return queryClient.invalidateQueries([QKP.chat, props.chatId]);
    },
  });

  const chatContextMemo = useMemo(() => ({
    chatId: props.chatId,
    chatData: data,
    addChatItem: addChatItem.mutate,
    addNewSpan: addNewSpan.mutate,
  }), [props.chatId, data, addChatItem, addNewSpan]);

  return <ChatCtx.Provider value={chatContextMemo}>
    {props.children}
  </ChatCtx.Provider>;
}
