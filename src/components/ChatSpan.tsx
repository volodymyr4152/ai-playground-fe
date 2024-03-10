import React, {Fragment} from 'react';
import {TChatCallChain, TChatSpan} from '../types/dataTypes';
import ChatCallChain from './ChatCallChain';

import {useDeleteSpan, useSpanQuery} from "../hooks/useSpanApi";
import {SpanContextProvider, useChatContext} from "../contexts/chatContexts";
import {Badge, Button} from "flowbite-react";
import {ModPopover} from "./ModPopover";
import {MdDeleteForever, MdInfoOutline} from "react-icons/md";
import CopyBadge from "./CopyBadge";
import Moment from "react-moment";
import {Content as PopoverContent, Root as PopoverRoot, Trigger as PopoverTrigger} from "@radix-ui/react-popover";

interface IChatSpanProps {
  spanId: string;
}

const ChatSpan: React.FC<IChatSpanProps> = ({spanId}) => {
  const {data: spanData} = useSpanQuery(spanId);

  const {chatId} = useChatContext();
  const deleteSpanMutation = useDeleteSpan();
  const deleteSpan = () => deleteSpanMutation.mutate({spanId, chatId});

  if (!spanData || !spanId) {
    return <div>Loading...</div>;
  }

  return <SpanContextProvider value={{spanId}}>
    <div className="bg-gray-200 p-1 rounded-md mb-2 last:mb-0" id={`chat-span-${spanData.id}`}>
      <div className="flex items-center space-x-1">
        <Badge color="dark" size="s">SPAN: {spanData.title || "no-title"}</Badge>
        <ModPopover
          triggerChild={<MdInfoOutline/>}
          contentChild={<Fragment>
            <CopyBadge color="gray" size="xs" copyContent={spanData.created_at}>
              created:<Moment format="HH:mm YYYY-MM-DD">{spanData.created_at}</Moment>
            </CopyBadge>
            <CopyBadge color="gray" size="xs" copyContent={spanData.updated_at}>
              updated:<Moment format="HH:mm YYYY-MM-DD">{spanData.updated_at}</Moment>
            </CopyBadge>
            <CopyBadge color="gray" size="xs" copyContent={spanId}>id: {spanId}</CopyBadge>
          </Fragment>}
        />
        <PopoverRoot>
          <PopoverTrigger>
            <div className="hover:bg-red-300 p-1 rounded"><MdDeleteForever/></div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="bg-red-100 rounded border border-red-500 p-2 flex-col items-center flex">
              <div>Are you sure?</div>
              <Button color="failure" onClick={deleteSpan} className="p-0" size="xs">Yes</Button>
            </div>
          </PopoverContent>
        </PopoverRoot>
      </div>
      <div className="space-y-4">
        {spanData.call_chains.map((chain: TChatCallChain) =>
          <ChatCallChain key={chain.id} chainId={chain.id}/>
        )}
      </div>
    </div>
  </SpanContextProvider>
};

export default ChatSpan;
