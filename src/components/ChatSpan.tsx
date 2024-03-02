import React from 'react';
import { TChatCallChain } from '../types/dataTypes';
import ChatCallChain from './ChatCallChain';
import {useSpanCtx} from "../contexts/SpanCtx";
import {ChainCtxProvider} from "../contexts/ChainCtx";

interface IChatSpanProps {}

const ChatSpan: React.FC<IChatSpanProps> = (props) => {
  const { spanData, isFetching, refreshSpan } = useSpanCtx();
  if (!spanData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-200 p-1 rounded-md mb-2 last:mb-0" id={`chat-span-${spanData.id}`}>
      <h3 className="text-lg font-bold mb-2">SPAN: {spanData.title}</h3>

      <div className="space-y-4">
        {spanData.call_chains.map((chain: TChatCallChain) => (
          <ChainCtxProvider
            key={chain.id}
            chainId={chain.id}
            pauseFetching={isFetching}
            invalidateParentCtx={refreshSpan}
          >
            <ChatCallChain />
          </ChainCtxProvider>
        ))}
      </div>
    </div>
  );
};

export default ChatSpan;
