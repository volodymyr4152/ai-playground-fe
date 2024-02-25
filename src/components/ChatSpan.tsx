import React from 'react';
import { TChatCallChain } from '../types/dataTypes';
import ChatCallChain from './ChatCallChain';
import {useSpanCtx} from "../contexts/SpanCtx";

interface IChatSpanProps {}

const ChatSpan: React.FC<IChatSpanProps> = (props) => {
  const { spanData } = useSpanCtx();
  if (!spanData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-200 p-1 rounded-md mb-2 last:mb-0" id={`chat-span-${spanData.id}`}>
      <h3 className="text-lg font-bold mb-2">SPAN: {spanData.title}</h3>

      <div className="space-y-4">
        {spanData.call_chains.map((chain: TChatCallChain, index: number) => (
          <ChatCallChain
            key={chain.id}
            chainId={chain.id}
            createdAt={chain.created_at}
            updatedAt={chain.updated_at}
            span={chain.span}
            title={chain.title}
            items={chain.items}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSpan;
