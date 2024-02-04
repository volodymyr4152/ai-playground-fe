import React from 'react';
import {TChatCallChain} from "../types/contextTypes";
import MessageItem from "./MessageMultitype";

interface IChatCallChainProps extends Omit<TChatCallChain, 'id' | 'created_at' | 'updated_at'> {
  chainId: string;
  createdAt: string;
  updatedAt: string;
}

const ChatCallChain: React.FC<IChatCallChainProps> = ({ chainId, createdAt, updatedAt, span, title, items }) => {
  return (
    <div className="bg-gray-200 p-4 mb-4 rounded shadow">
      <p className="text-lg font-bold mb-2">Call Chain ID: {chainId}</p>
      <p className="text-sm text-gray-600">Created At: {createdAt}</p>
      <p className="text-sm text-gray-600">Updated At: {updatedAt}</p>
      <p className="text-sm text-gray-600">Span: {span}</p>
      {title && (
        <p className="text-lg font-bold">Title: {title}</p>
      )}
      <div className="mt-4 border-t pt-4">
        {items.map((item, index) => <MessageItem key={item.id} { ...item} itemId={item.id}/>)}
      </div>
    </div>
  );
};

export default ChatCallChain;
