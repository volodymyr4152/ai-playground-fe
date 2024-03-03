import React from 'react';
import {TChatCallChain, TChatSpan} from '../types/dataTypes';
import ChatCallChain from './ChatCallChain';

interface IChatSpanProps extends TChatSpan {}

const ChatSpan: React.FC<IChatSpanProps> = (props) => {
  return (
    <div className="bg-gray-200 p-1 rounded-md mb-2 last:mb-0" id={`chat-span-${props.id}`}>
      <h3 className="text-lg font-bold mb-2">SPAN: {props.title}</h3>

      <div className="space-y-4">
        {props.call_chains.map((chain: TChatCallChain) => (
          <ChatCallChain key={chain.id} {...chain} />
        ))}
      </div>
    </div>
  );
};

export default ChatSpan;
