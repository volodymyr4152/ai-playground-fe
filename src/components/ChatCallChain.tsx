import React from 'react';
import MessageItem from "./MessageMultitype";
import {Badge, Button} from "flowbite-react";
import Moment from "react-moment";
import {Content as PopoverContent, Root as PopoverRoot, Trigger as PopoverTrigger} from "@radix-ui/react-popover";
import {MdDeleteForever, MdInfoOutline} from "react-icons/md";
import {useChainCtx} from "../contexts/ChainCtx";
import {ChainItemCtxProvider} from "../contexts/ChainItemCtx";
import useHoverClickPopover from "../hooks/useHoverClickPopover";
import CopyBadge from "./CopyBadge";

interface IChatCallChainProps {
}

const ChatCallChain: React.FC<IChatCallChainProps> = () => {
  const { chainId, chainData, isLoading, isFetching, refreshChain, deleteChain } = useChainCtx();
  const {isOpen, mouseEnter, mouseLeave, mouseClick} = useHoverClickPopover();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-gray-200 p-1 mb-2 rounded shadow" id={`call-chain-${chainId}`}>
      <div className="flex items-center space-x-1">
        <Badge color="purple" size="s">Call Chain: {chainData.title || "no-title"}</Badge>
        <PopoverRoot>
          <PopoverTrigger>
            <div
              className={"hover:bg-white p-1 rounded" + (isOpen ? " bg-gray-300" : "")}
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
              onClick={mouseClick}
            >
              <MdInfoOutline/>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div
              className="flex flex-col h-full gap-1 p-1 bg-white rounded border-gray-400 border"
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            >
              <CopyBadge color="gray" size="xs" copyContent={chainData.created_at}>
                created:<Moment format="HH:mm YYYY-MM-DD">{chainData.created_at}</Moment>
              </CopyBadge>
              <CopyBadge color="gray" size="xs" copyContent={chainData.updated_at}>
                updated:<Moment format="HH:mm YYYY-MM-DD">{chainData.updated_at}</Moment>
              </CopyBadge>
              <CopyBadge color="gray" size="xs" copyContent={chainId}>id: {chainId}</CopyBadge>
            </div>
          </PopoverContent>
        </PopoverRoot>
        <PopoverRoot>
          <PopoverTrigger>
            <div className="hover:bg-red-300 p-1 rounded"><MdDeleteForever/></div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="bg-red-100 rounded border border-red-500 p-2 flex-col items-center flex">
              <div>Are you sure?</div>
              <Button color="failure" onClick={deleteChain} className="p-0" size="xs">Yes</Button>
            </div>
          </PopoverContent>
        </PopoverRoot>

      </div>
      <div className="border-t pt-2">
        {chainData.items.map((item) =>
          <ChainItemCtxProvider key={item.id} itemId={item.id} pauseFetching={isFetching} invalidateParentCtx={refreshChain}>
            <MessageItem key={item.id}/>
          </ChainItemCtxProvider>
        )}
      </div>
    </div>
  );
};

export default ChatCallChain;
