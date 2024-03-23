import {aipeReqInstance, queryKeys} from "../utils";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {TTextTemplate} from "../types/dataTypes";


export const setTextTemplateQueryData = (template: TTextTemplate, queryClient: any, selfUpdate=true) => {
  if (selfUpdate) {
    queryClient.setQueryData(queryKeys.textTemplate(template.id), template);
  }
}

export const useTextTemplateQuery = (templateId: string, queryParams = undefined) => {
  const queryClient = useQueryClient();
  return useQuery<TTextTemplate>({
    queryKey: queryKeys.textTemplate(templateId),
    queryFn: () => aipeReqInstance.get(`templates/${templateId}/`).then((res) => {
      setTextTemplateQueryData(res.data, queryClient, false)
      return res.data;
    }),
    enabled: !!templateId,
    staleTime: Infinity,
    ...queryParams ?? {}
  });
}


interface IUpdateTextTemplate {
  textTemplateId: string;
  textTemplate: Partial<TTextTemplate>;
}

export const useUpdateTextTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({textTemplateId, textTemplate}: IUpdateTextTemplate) => {
      return aipeReqInstance.patch(`templates/${textTemplateId}/`, textTemplate).then((res) => res.data);
    },
    onSettled: (data, error, variables: IUpdateTextTemplate, context) => {
      return queryClient.invalidateQueries({queryKey: queryKeys.textTemplate(variables.textTemplateId), exact: true});
    }
  });
}

