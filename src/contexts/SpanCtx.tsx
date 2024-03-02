import {createContext, useContext} from "react";
import {TChatCallChain, TChatSpan} from "../types/dataTypes";
import {useQuery} from "react-query";
import {queryClient} from "../App";
import {aipeReqInstance} from "./utils";
import {setChainNestedData} from "./ChainCtx";

interface ISpanCtx {
  spanData?: TChatSpan
  spanId: string
  isLoading: boolean
  isFetching: boolean
  refreshSpan: () => void
}

export const SpanCtx = createContext<ISpanCtx>(undefined);

export const useSpanCtx = () => {
  return useContext(SpanCtx);
};

export const setSpanNestedData = (span: TChatSpan, selfUpdate: boolean = true) => {
  if (selfUpdate) {
    queryClient.setQueryData(['span', span.id], span);
  }
  span.call_chains.forEach((callChain: TChatCallChain) => {
    setChainNestedData(callChain);
  });
}

export const SpanCtxProvider = (props: { children: React.ReactNode, spanId: string, pauseFetching?: boolean }) => {
  const { data, isLoading, refetch, isFetching, isSuccess } = useQuery({
    queryKey: ['span', props.spanId],
    queryFn: () => aipeReqInstance.get(`spans/${props.spanId}/`).then((res) => res.data),
    enabled: !!props.spanId && !props.pauseFetching,
    onSuccess: (data) => setSpanNestedData(data, false)
  });
  return <SpanCtx.Provider value={{
    spanId: props.spanId,
    spanData: data,
    isLoading,
    isFetching: isFetching || props.pauseFetching || isSuccess,
    refreshSpan: refetch,
  }}>
    {props.children}
  </SpanCtx.Provider>;
}
