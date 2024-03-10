import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {aipeReqInstance, queryKeys} from "../utils";
import {TChat} from "../types/dataTypes";
import {setSpanQueryData} from "./useSpanApi";

const setChatQueryData = (chat: TChat, queryClient: any, selfUpdate = true) => {
  if (selfUpdate) {
    queryClient.setQueryData(queryKeys.chat(chat.id), chat);
  }
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
