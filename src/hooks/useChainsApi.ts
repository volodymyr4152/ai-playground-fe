import {TChatCallChain, TChatItemMultiType} from "../types/dataTypes";
import {aipeReqInstance, queryKeys} from "../utils";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {setChainItemQueryData} from "./useChainItemApi";

export const setChainQueryData = (chain: TChatCallChain, queryClient: any, selfUpdate=true) => {
  if (selfUpdate) {
    queryClient.setQueryData(queryKeys.chain(chain.id), chain);
  }
  chain.items.forEach((item: any) => setChainItemQueryData(item, queryClient));
}

export const useChainQuery = (chainId: string, queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TChatCallChain>({
    queryKey: queryKeys.chain(chainId),
    queryFn: () => aipeReqInstance.get(`chains/${chainId}/`).then((res) => {
      setChainQueryData(res.data, queryClient, false)
      return res.data;
    }),
    enabled: !!chainId,
    staleTime: Infinity,
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

interface IDeleteChain {
  spanId: string;
  chainId: string;
}
export const useDeleteChain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({chainId}: IDeleteChain) => aipeReqInstance.delete(`chains/${chainId}/`),
    onSettled: (data, error, variables: IDeleteChain, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.span(variables.spanId), exact: true});
    }
  });
}
