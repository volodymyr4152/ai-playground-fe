import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {aipeReqInstance, queryKeys} from "../utils";
import {TChatSpan, TChatVariable} from "../types/dataTypes";

export const setContextVarData = (varData: TChatVariable, queryClient: any, selfUpdate = true) => {
  queryClient.setQueryData(queryKeys.variable(varData.id), varData);
}

export const useContextVar = (varId: string, queryParams = undefined) => {
  return useQuery<TChatSpan>({
    queryKey: queryKeys.variable(varId),
    queryFn: () => aipeReqInstance.get(`variables/${varId}/`).then((res) => {
      return res.data;
    }),
    enabled: !!varId,
    staleTime: Infinity,
    ...queryParams ?? {}
  });
}

interface IAddNewVar {
  chatId: string;
  varData: Partial<TChatVariable>;
}

export const useAddNewVar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({varData, chatId}: IAddNewVar) =>
      aipeReqInstance.post(`contexts/${chatId}/variables/`, varData).then((res) => res.data),
    onSettled: (data, error, variables: IAddNewVar, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.chat(variables.chatId), exact: true});
    }
  });
}


interface IDeleteVar {
  varId: string;
  chatId: string;
}

export const useDeleteVar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({varId}: IDeleteVar) => aipeReqInstance.delete(`variables/${varId}/`),
    onSettled: (data, error, variables: IDeleteVar, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.chat(variables.chatId), exact: true});
    }
  });
}


interface IUpdateVar {
  varId: string;
  varData: Partial<TChatVariable>;
}

export const useUpdateVar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IUpdateVar) => aipeReqInstance.patch(`variables/${params.varId}/`, params.varData),
    onSettled: (data, error, variables: IUpdateVar, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.variable(variables.varId), exact: true});
    }
  });
}
