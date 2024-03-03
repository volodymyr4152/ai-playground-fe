import {createContext, useContext} from "react";
import {TChatCallChain, TChatItemMultiType, TChatSpan} from "../types/dataTypes";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../App";
import {aipeReqInstance} from "./utils";
import {setItemData} from "./ChainItemCtx";

interface IChainCtx {
  chainData?: TChatCallChain
  chainId: string
  isLoading: boolean
  isFetching: boolean
  refreshChain: () => void
  deleteChain: () => void
  genNewItem: () => void
}

interface IChainCtxProviderProps {
  children: React.ReactNode
  chainId: string
  pauseFetching?: boolean
  invalidateParentCtx?: () => void
}

export const ChainCtx = createContext<IChainCtx>(undefined);

export const useChainCtx = () => {
  return useContext(ChainCtx);
};

export const setChainNestedData = (chain: TChatCallChain, selfUpdate: boolean = true) => {
  if (selfUpdate) {
    queryClient.setQueryData(['callChain', chain.id], chain);
  }
  chain.items.forEach((item: TChatItemMultiType) => setItemData(item));
}

export const ChainCtxProvider = (props: IChainCtxProviderProps) => {
  const { data, isLoading, refetch, isFetching, isSuccess } = useQuery({
    queryKey: ['callChain', props.chainId],
    queryFn: () => aipeReqInstance.get(`chains/${props.chainId}/`).then((res) => res.data),
    enabled: !!props.chainId && !props.pauseFetching,
    onSuccess: (data) => setChainNestedData(data, false),
  });

  const deleteChain = useMutation({
    mutationFn: () => aipeReqInstance.delete(`chains/${props.chainId}/`).then((res) => res.data),
    onSuccess: (result, variables, context) => props.invalidateParentCtx(),
  });

  const genNewItem = useMutation({
    mutationFn: () => aipeReqInstance.put(`chains/${props.chainId}/generating/`, {}).then((res) => res.data),
    onSuccess: (result, variables, context) => {
      return queryClient.invalidateQueries(['callChain', props.chainId]);
    },
  });

  return <ChainCtx.Provider value={{
    chainId: props.chainId,
    chainData: data,
    isLoading,
    isFetching: isFetching || props.pauseFetching || isSuccess,
    refreshChain: refetch,
    deleteChain: () => deleteChain.mutate(),
    genNewItem: () => genNewItem.mutate(),
  }}>
    {props.children}
  </ChainCtx.Provider>
}
