import React from 'react';
import {TChatCallChain, TChatSpan} from '../types/dataTypes';
import ChatCallChain from './ChatCallChain';

interface IChatSpanProps {
  spanId: string;
  spanData?: TChatSpan;
}

const ChatSpan: React.FC<IChatSpanProps> = ({spanId, spanData}) => {
  if (!spanData || !spanId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-200 p-1 rounded-md mb-2 last:mb-0" id={`chat-span-${spanData.id}`}>
      <h3 className="text-lg font-bold mb-2">SPAN: {spanData.title}</h3>
      <div className="space-y-4">
        {spanData.call_chains.map((chain: TChatCallChain) =>
          <ChatCallChain key={chain.id} chainId={chain.id} chainData={chain} spanId={spanId} />
        )}
      </div>
    </div>
  );
};

export default ChatSpan;
