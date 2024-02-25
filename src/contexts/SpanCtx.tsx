import {createContext, useContext} from "react";
import {TChatCallChain, TChatItemMultiType, TChatSpan} from "../types/dataTypes";
import axios from "axios";
import {useQuery} from "react-query";
import {queryClient} from "../App";
import {aipeReqInstance} from "./utils";

interface ISpanCtx {
  spanData?: TChatSpan
  spanId: string
  isLoading: boolean
  refreshSpan: () => void
}

export const SpanCtx = createContext<ISpanCtx>(undefined);

export const useSpanCtx = () => {
  return useContext(SpanCtx);
};

export const setSpanNestedData = (span: TChatSpan) => {
  span.call_chains.forEach((callChain: TChatCallChain) => {
    queryClient.setQueryData(['callChain', callChain.id], callChain)
    callChain.items.forEach((item: TChatItemMultiType) => queryClient.setQueryData(['chainItem', item.id], item));
  });
}

export const SpanCtxProvider = (props: { children: React.ReactNode, spanId: string }) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['span', props.spanId],
    queryFn: () => aipeReqInstance.get(`spans/${props.spanId}/`).then((res) => res.data),
    enabled: !!props.spanId,
    onSuccess: setSpanNestedData,
  });
  return <SpanCtx.Provider value={{
    spanId: props.spanId, spanData: data, isLoading: isLoading, refreshSpan: refetch,
  }}>
    {props.children}
  </SpanCtx.Provider>;
}
