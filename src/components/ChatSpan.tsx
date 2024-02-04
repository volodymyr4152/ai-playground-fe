import React from 'react';
import { TChatSpan, TChatCallChain } from '../types/contextTypes';
import ChatCallChain from './ChatCallChain';

const ChatSpan: React.FC<{ span: TChatSpan }> = ({ span }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md mb-4">
      <h3 className="text-lg font-bold mb-2">SPAN: {span.title}</h3>

      <div className="space-y-4">
        {span.call_chains.map((chain: TChatCallChain, index: number) => (
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
