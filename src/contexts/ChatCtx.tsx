import {createContext, useCallback, useContext, useMemo} from "react";
import {TAssumption, TChat, TChatItemMultiType, TChatSpan, TFact, TGoal, TGuideline} from "../types/dataTypes";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useChatQuery} from "../hooks/useChatsApi";
import {aipeReqInstance, queryKeys} from "../utils";
import {data} from "autoprefixer";

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


export const ChatCtxProvider = (props: { children: React.ReactNode, chatId: string }) => {
  const queryClient = useQueryClient();
  const { data } = useChatQuery(props.chatId);

  const lastSpanId = data?.spans[data.spans.length - 1].id;
  const addChatItemApiFn = useCallback(
    (item: Partial<TChatItemMultiType>) => {
      return aipeReqInstance.post(`spans/${lastSpanId}/chains/`, {"items": [item]}).then((res) => res.data);
    }, [lastSpanId]
  );
  const addChatItemSuccessFn = useCallback(
    (result, variables, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.span(lastSpanId), exact: true});
    }, [queryClient, lastSpanId]
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
      return queryClient.invalidateQueries({queryKey: queryKeys.chat(props.chatId), exact: true});
    }
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
