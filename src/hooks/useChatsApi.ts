import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {aipeReqInstance, queryKeys} from "../utils";
import {TChat} from "../types/dataTypes";
import {setSpanQueryData} from "./useSpanApi";
import {setContextVarData} from "./useContextVarsApi";

const setChatQueryData = (chat: TChat, queryClient: any, selfUpdate = true) => {
  if (selfUpdate) {
    queryClient.setQueryData(queryKeys.chat(chat.id), chat);
  }
  chat.spans.forEach((span: any) => setSpanQueryData(span, queryClient));
  chat.memo_items.forEach((memoItem: any) =>
    queryClient.setQueryData(queryKeys.memoItems(memoItem.id), memoItem)
  );
  chat.variables.forEach((varData: any) => setContextVarData(varData, queryClient));
}

export const useChatListQuery = (queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TChat[]>({
    queryKey: queryKeys.chatList(),
    queryFn: (): Promise<TChat[]> => aipeReqInstance
      .get('contexts/')
      .then((res) => {
        res.data.forEach((chat) => setChatQueryData(chat, queryClient))
        return res.data;
      }),
    staleTime: 1000 * 60 * 10,
    ...queryParams ?? {}
  });
}

interface IAddNewChat {
  chatInfo?: Partial<TChat>;
}

export const useAddNewChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({chatInfo}: IAddNewChat = undefined) =>
      aipeReqInstance.post('contexts/', chatInfo).then((res) => res.data),
    onSettled: (data, error, variables: IAddNewChat, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.chatList(), exact: true});
    }
  });
}

export const useChatQuery = (chatId: string, queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TChat>({
    queryKey: queryKeys.chat(chatId),
    queryFn: () => aipeReqInstance.get(`contexts/${chatId}/`).then((res) => {
      setChatQueryData(res.data, queryClient, false);
      return res.data;
    }),
    enabled: !!chatId,
    staleTime: Infinity,
    ...queryParams ?? {}
  });
}


export interface IUpdateChat {
  chatData: Partial<TChat>;
}

export const useUpdateChat = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatData }: IUpdateChat) => aipeReqInstance.patch(`contexts/${chatId}/`, chatData),
    onSettled: (data, error, variables: IUpdateChat, context) => {
      return queryClient.invalidateQueries({ queryKey: queryKeys.chat(chatId), exact: true });
    }
  });
}
