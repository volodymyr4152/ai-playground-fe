import {TChatCallChain, TChatItemMultiType} from "../types/dataTypes";
import {aipeReqInstance, queryKeys} from "../utils";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {setChainItemQueryData} from "./useChainItemApi";

export const setChainQueryData = (chain: TChatCallChain, queryClient: any) => {
  queryClient.setQueryData(queryKeys.chain(chain.id), chain);
  chain.items.forEach((item: any) => setChainItemQueryData(item, queryClient));
}

export const useChainQuery = (chainId: string, queryParams = undefined) => {
  const queryClient = useQueryClient();
  const randomWaitOffset = Math.random() * 1000 * 20;
  return useQuery<TChatCallChain>({
    queryKey: queryKeys.chain(chainId),
    queryFn: () => aipeReqInstance.get(`chains/${chainId}/`).then((res) => res.data),
    enabled: !!chainId,
    staleTime: 1000 * 60 * 10 + randomWaitOffset,
    onSuccess: (chain: TChatCallChain) => setChainQueryData(chain, queryClient),
    ...queryParams ?? {}
  });
}


interface IAddChainWithItem {
  spanId: string;
  item: Partial<TChatItemMultiType>;
}

export const useAddChainWithItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({spanId, item}: IAddChainWithItem) => {
      return aipeReqInstance.post(`spans/${spanId}/chains/`, {"items": [item]}).then((res) => res.data);
    },
    onSettled: (data, error, variables: IAddChainWithItem, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.span(variables.spanId), exact: true});
    }
  });
}
