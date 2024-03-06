import {createContext, useContext} from "react";
import {TChatItemMultiType, TChatSpan} from "../types/dataTypes";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../App";
import {aipeReqInstance, QKP} from "./utils";

interface IChainItemCtx {
  itemData?: TChatItemMultiType
  itemId: string
  isLoading: boolean
  isFetching: boolean
  refreshItem: () => void
  deleteItem: () => void
}

export const ChainItemCtx = createContext<IChainItemCtx>(undefined);

export const useChainItemCtx = () => {
  return useContext(ChainItemCtx);
};

export const setItemData = (item: TChatItemMultiType, selfUpdate: boolean = true) => {
  if (selfUpdate) {
    queryClient.setQueryData([QKP.chainItem, item.id], item);
  }
}

export interface IChainItemCtxProviderProps {
  children: React.ReactNode
  itemId: string
  pauseFetching?: boolean
  invalidateParentCtx?: () => void
}

export const ChainItemCtxProvider = (props: IChainItemCtxProviderProps) => {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: [QKP.chainItem, props.itemId],
    queryFn: () => aipeReqInstance.get(`items/${props.itemId}/`).then((res) => res.data as TChatItemMultiType),
    enabled: !!props.itemId && !props.pauseFetching,
  });

  const deleteItem = useMutation({
    mutationFn: () => aipeReqInstance.delete(`items/${props.itemId}/`),
    onSuccess: (result, variables, context) => {
      console.log('item deleted', result);
      if (props.invalidateParentCtx) {
        props.invalidateParentCtx();
      }
    },
  });

  return <ChainItemCtx.Provider value={{
    itemId: props.itemId,
    itemData: data,
    isLoading,
    isFetching: isFetching || props.pauseFetching,
    refreshItem: refetch,
    deleteItem: () => deleteItem.mutate(),
  }}>
    {props.children}
  </ChainItemCtx.Provider>;
}
