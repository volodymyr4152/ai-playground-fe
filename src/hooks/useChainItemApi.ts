import {TChatItemMultiType} from "../types/dataTypes";
import {aipeReqInstance, queryKeys} from "../utils";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export const setChainItemQueryData = (item: TChatItemMultiType, queryClient: any, selfUpdate=true) => {
  queryClient.setQueryData(queryKeys.chainItem(item.id), item);
}

export const useChainItemQuery = (itemId: string, queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TChatItemMultiType>({
    queryKey: queryKeys.chainItem(itemId),
    queryFn: () => aipeReqInstance.get(`items/${itemId}/`).then((res) => {
      setChainItemQueryData(res.data, queryClient, false);
      return res.data;
    }),
    enabled: !!itemId,
    staleTime: Infinity,
    ...queryParams ?? {}
  });
}

export interface IUpdateChainItem {
  itemId: string;
  item: Partial<TChatItemMultiType>;
}
export const useUpdateChainItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({itemId, item}: IUpdateChainItem) => aipeReqInstance.patch(`items/${itemId}/`, item),
    onSettled: (data, error, variables: IUpdateChainItem, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.chainItem(variables.itemId), exact: true});
    }
  });
}


interface IDeleteChainItem {
  chainId: string;
  itemId: string;
}
export const useDeleteChainItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({chainId, itemId}: IDeleteChainItem) => aipeReqInstance.delete(`items/${itemId}/`),
    onSettled: (data, error, variables: IDeleteChainItem, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.chain(variables.chainId), exact: true});
    }
  });
}
