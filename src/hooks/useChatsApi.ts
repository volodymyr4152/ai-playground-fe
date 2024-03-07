import {TChat, TChatCallChain, TChatItemMultiType, TChatSpan} from "../types/dataTypes";
import {aipeReqInstance, queryKeys} from "../utils";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import type {UseQueryResult} from "@tanstack/react-query/src/types";


const setChainItemQueryData = (item: TChatItemMultiType, queryClient: any) => {
  queryClient.setQueryData(queryKeys.chainItem(item.id), item);
}

const setChainQueryData = (chain: TChatCallChain, queryClient: any) => {
  queryClient.setQueryData(queryKeys.chain(chain.id), chain);
  chain.items.forEach((item: any) => setChainItemQueryData(item, queryClient));
}

const setSpanQueryData = (span: TChatSpan, queryClient: any) => {
  queryClient.setQueryData(queryKeys.span(span.id), span);
  span.call_chains.forEach((chain: any) => setChainQueryData(chain, queryClient));
}

const setChatQueryData = (chat: TChat, queryClient: any) => {
  queryClient.setQueryData(queryKeys.chat(chat.id), chat);
  chat.spans.forEach((span: any) => setSpanQueryData(span, queryClient));
  chat.assumptions.forEach((assumption: any) =>
    queryClient.setQueryData(queryKeys.assumption(assumption.id), assumption)
  );
  chat.facts.forEach((fact: any) =>
    queryClient.setQueryData(queryKeys.fact(fact.id), fact)
  );
  chat.goals.forEach((goal: any) =>
    queryClient.setQueryData(queryKeys.goal(goal.id), goal)
  );
  chat.guidelines.forEach((guideline: any) =>
    queryClient.setQueryData(queryKeys.guideline(guideline.id), guideline)
  );
}

export const useChatListQuery = (queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TChat[]>({
    queryKey: queryKeys.chatList(),
    queryFn: (): Promise<TChat[]> => aipeReqInstance.get('contexts/').then((res) => res.data),
    onSuccess: (chats: TChat[]) => chats.forEach((chat) => setChatQueryData(chat, queryClient)),
    staleTime: 1000 * 60 * 10,
    ...queryParams ?? {}
  });
}


export const useChatQuery = (chatId: string, queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TChat>({
    queryKey: queryKeys.chat(chatId),
    queryFn: () => aipeReqInstance.get(`contexts/${chatId}/`).then((res) => res.data),
    enabled: !!chatId,
    onSuccess: (chat: TChat) => setChatQueryData(chat, queryClient),
    ...queryParams ?? {}
  });
}


export const useSpanQuery = (spanId: string, queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TChatSpan>({
    queryKey: queryKeys.span(spanId),
    queryFn: () => aipeReqInstance.get(`spans/${spanId}/`).then((res) => res.data),
    enabled: !!spanId,
    onSuccess: (span: TChatSpan) => setSpanQueryData(span, queryClient),
    ...queryParams ?? {}
  });
}


export const useChainQuery = (chainId: string, queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TChatCallChain>({
    queryKey: queryKeys.chain(chainId),
    queryFn: () => aipeReqInstance.get(`chains/${chainId}/`).then((res) => res.data),
    enabled: !!chainId,
    onSuccess: (chain: TChatCallChain) => setChainQueryData(chain, queryClient),
    ...queryParams ?? {}
  });
}


export const useChainItemQuery = (itemId: string, queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TChatItemMultiType>({
    queryKey: queryKeys.chainItem(itemId),
    queryFn: () => aipeReqInstance.get(`chainItems/${itemId}/`).then((res) => res.data),
    enabled: !!itemId,
    onSuccess: (item: TChatItemMultiType) => setChainItemQueryData(item, queryClient),
    ...queryParams ?? {}
  });
}
