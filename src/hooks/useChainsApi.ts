import {TChatCallChain, TChatItemMultiType, TIndicationMessage} from "../types/dataTypes";
import {aipeReqInstance, queryKeys} from "../utils";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {setChainItemQueryData} from "./useChainItemApi";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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


interface IGenerateToChain {
  chainId: string;
}
export const useGenerateToChain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({chainId}: IGenerateToChain) => aipeReqInstance.post(`chains/${chainId}/generate/`),
    onMutate: async ({chainId}: IGenerateToChain) => {
      const prevChainData: TChatCallChain = queryClient.getQueryData(queryKeys.chain(chainId));
      const optimisticItemId = `indication-${crypto.randomUUID()}`;
      setChainQueryData({
        ...prevChainData,
        items: [...prevChainData.items, {
          id: optimisticItemId,
          item_type: "uiIndication",
          "status": "loading",
          created_at: new Date().toISOString(),
          text_content: "Generating new item..."
        } as TIndicationMessage]
      }, queryClient, true);
      return { prevChainData, optimisticItemId };
    },
    onError: (err, {chainId}: IGenerateToChain, { optimisticItemId }) => {
      const currentChainData: TChatCallChain = queryClient.getQueryData(queryKeys.chain(chainId));
      const newItems = currentChainData.items.map((item) => {
        if (item.id !== optimisticItemId) {
          return item;
        } else {
          return {
            id: optimisticItemId,
            item_type: "uiIndication",
            "status": "error",
            created_at: item.created_at,
            updated_at: new Date().toISOString(),
            text_content: err.toString()
          } as TIndicationMessage;
        }
      })
      setChainQueryData({...currentChainData, items: newItems}, queryClient, true);
    },
    onSuccess: (data, variables: IGenerateToChain, context) => {
      const currentChainData: TChatCallChain = queryClient.getQueryData(queryKeys.chain(variables.chainId));
      const newItems = currentChainData.items.flatMap((item) => {
        if (item.id !== context.optimisticItemId) {
          return item;
        } else {
          return data as unknown as TChatItemMultiType[];
        }
      });
      setChainQueryData({...currentChainData, items: newItems}, queryClient, true);
      return queryClient.invalidateQueries({queryKey: queryKeys.chain(variables.chainId), exact: true});
    }
  });
}
