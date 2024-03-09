import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {aipeReqInstance, queryKeys} from "../utils";
import {TChatSpan} from "../types/dataTypes";
import {setChainQueryData} from "./useChainsApi";

export const setSpanQueryData = (span: TChatSpan, queryClient: any) => {
  queryClient.setQueryData(queryKeys.span(span.id), span);
  span.call_chains.forEach((chain: any) => setChainQueryData(chain, queryClient));
}

export const useSpanQuery = (spanId: string, queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TChatSpan>({
    queryKey: queryKeys.span(spanId),
    queryFn: () => aipeReqInstance.get(`spans/${spanId}/`).then((res) => res.data),
    enabled: !!spanId,
    staleTime: Infinity,
    onSuccess: (span: TChatSpan) => setSpanQueryData(span, queryClient),
    ...queryParams ?? {}
  });
}

interface IAddNewSpan {
  chatId: string;
  spanInfo: Partial<TChatSpan>;
}

export const useAddNewSpan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({spanInfo, chatId}: IAddNewSpan) =>
      aipeReqInstance.post(`contexts/${chatId}/spans/`, spanInfo).then((res) => res.data),
    onSettled: (data, error, variables: IAddNewSpan, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.chat(variables.chatId), exact: true});
    }
  });
}
