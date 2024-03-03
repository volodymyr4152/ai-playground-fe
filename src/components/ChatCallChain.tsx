import React from 'react';
import MessageItem from "./MessageMultitype";
import {Badge, Button} from "flowbite-react";
import Moment from "react-moment";
import {Content as PopoverContent, Root as PopoverRoot, Trigger as PopoverTrigger} from "@radix-ui/react-popover";
import {MdDeleteForever, MdInfoOutline} from "react-icons/md";
import useHoverClickPopover from "../hooks/useHoverClickPopover";
import CopyBadge from "./CopyBadge";
import {TChatCallChain} from "../types/dataTypes";

interface IChatCallChainProps extends TChatCallChain {
}

const ChatCallChain: React.FC<IChatCallChainProps> = ({id: chainId, title, created_at, updated_at, items}) => {
  const {isOpen, mouseEnter, mouseLeave, mouseClick} = useHoverClickPopover();
  return (
    <div className="bg-gray-200 p-1 mb-2 rounded shadow" id={`call-chain-${chainId}`}>
      <div className="flex items-center space-x-1">
        <Badge color="purple" size="s">Call Chain: {title || "no-title"}</Badge>
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
              <CopyBadge color="gray" size="xs" copyContent={created_at}>
                created:<Moment format="HH:mm YYYY-MM-DD">{created_at}</Moment>
              </CopyBadge>
              <CopyBadge color="gray" size="xs" copyContent={updated_at}>
                updated:<Moment format="HH:mm YYYY-MM-DD">{updated_at}</Moment>
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
              <Button color="failure" className="p-0" size="xs">Yes</Button>
            </div>
          </PopoverContent>
        </PopoverRoot>

      </div>
      <div className="border-t pt-2">
        {items.map((item) => <MessageItem key={item.id} itemData={item}/>)}
      </div>
    </div>
  );
};

export default ChatCallChain;
