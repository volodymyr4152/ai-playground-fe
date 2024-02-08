import React from 'react';
import { TChatSpan, TChatCallChain } from '../types/contextTypes';
import ChatCallChain from './ChatCallChain';

interface IChatSpanProps {
  span: TChatSpan;
}

const ChatSpan: React.FC<IChatSpanProps> = (props) => {
  return (
    <div className="bg-gray-200 p-1 rounded-md mb-2 last:mb-0" id={`chat-span-${props.span.id}`}>
      <h3 className="text-lg font-bold mb-2">SPAN: {props.span.title}</h3>

      <div className="space-y-4">
        {props.span.call_chains.map((chain: TChatCallChain, index: number) => (
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
