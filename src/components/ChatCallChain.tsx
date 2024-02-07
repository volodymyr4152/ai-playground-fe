import React from 'react';
import {TChatCallChain} from "../types/contextTypes";
import MessageItem from "./MessageMultitype";
import {Badge} from "flowbite-react";
import Moment from "react-moment";

interface IChatCallChainProps extends Omit<TChatCallChain, 'id' | 'created_at' | 'updated_at'> {
  chainId: string;
  createdAt: string;
  updatedAt: string;
}

const ChatCallChain: React.FC<IChatCallChainProps> = ({ chainId, createdAt, updatedAt, span, title, items }) => {
  return (
    <div className="bg-gray-200 p-4 mb-4 rounded shadow" id={`call-chain-${chainId}`}>
      <div className="flex items-center space-x-1">
        <Badge color="purple" size="s">Call Chain: {title || "no-title"}</Badge>
        <Badge color="gray" size="xs">
          created:<Moment format="HH:mm YYYY-MM-DD">{createdAt}</Moment>
        </Badge>
        <Badge color="gray" size="xs">
          updated:<Moment format="HH:mm YYYY-MM-DD">{updatedAt}</Moment>
        </Badge>
        <Badge color="gray" size="xs">id: {chainId}</Badge>
      </div>
      <div className="border-t pt-2">
        {items.map((item, index) => <MessageItem key={item.id} { ...item} itemId={item.id}/>)}
      </div>
    </div>
  );
};

export default ChatCallChain;
