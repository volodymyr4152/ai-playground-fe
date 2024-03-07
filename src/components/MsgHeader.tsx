import React, {useCallback} from "react";
import Moment from "react-moment";
import { Root as PopoverRoot, Trigger as PopoverTrigger, Content as PopoverContent } from '@radix-ui/react-popover';
import { Badge } from "flowbite-react";
import { MdDeleteForever, MdInfoOutline, MdOutlineEdit } from "react-icons/md";
import CopyBadge from "./CopyBadge";
import useHoverClickPopover from "../hooks/useHoverClickPopover";
import {aipeReqInstance} from "../utils";

interface IMessageHeaderProps {
  itemId: string;
  createdAt: string;
  updatedAt: string;
  itemRole: string;
  itemType: string;
  tokenCount?: number;
  authorName?: string;
  status?: string; // for tool calls
  callId?: string; // for tool calls
  isEditable?: boolean;
}

const colorByType = {
  assistant: 'blue',
  tool: 'green',
  user: 'yellow',
  system: 'purple',
  default: 'red'
}


const MessageHeader: React.FC<IMessageHeaderProps> = (props) => {
  const mainColor = colorByType[props.itemType] || colorByType.default;
  const isNameVisible = (props.authorName !== undefined && props.authorName !== null && props.authorName !== "");
  const isTokenCountVisible = (props.tokenCount !== undefined && props.tokenCount !== null && props.tokenCount > 0);
  const {isOpen, mouseEnter, mouseLeave, mouseClick} = useHoverClickPopover();
  const deleteItem = useCallback(
    () => aipeReqInstance.delete(`items/${props.itemId}/`),
    [props.itemId]
  )

  return (
    <div className="flex flex-wrap items-center space-x-2" data-role="message-header" key={props.itemId}>
      {isNameVisible && <Badge key="authorName" color={mainColor} size="s">Name: {props.authorName}</Badge>}
      <Badge key="type" color={mainColor} size="s" className="min-w-28">{props.itemType}</Badge>
      <Badge key="role" color={mainColor} size="s">{props.itemRole}</Badge>
      <div className="p-3 flex-grow"></div>
      <PopoverRoot open={isOpen}>
        <PopoverTrigger>
          <div
            className={"hover:bg-white p-1 rounded" + (isOpen ? " bg-gray-300" : "")}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onClick={mouseClick}
          ><MdInfoOutline/></div>
        </PopoverTrigger>
        <PopoverContent>
          <div
            className="flex flex-col h-full gap-1 p-1 bg-white rounded border-gray-400 border"
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          >
            <CopyBadge key="creationTime" color="gray" copyContent={props.createdAt}>
              created:<Moment format="HH:mm YYYY-MM-DD">{props.createdAt}</Moment>
            </CopyBadge>
            <CopyBadge key="updateTime" color="gray" copyContent={props.updatedAt}>
              updated:<Moment format="HH:mm YYYY-MM-DD">{props.updatedAt}</Moment>
            </CopyBadge>
            <CopyBadge key="systemId" color="gray" copyContent={props.itemId}>ID:{props.itemId}</CopyBadge>
            {isTokenCountVisible && <Badge key="tokenCount" color="gray">Token Count: {props.tokenCount}</Badge>}
          </div>
        </PopoverContent>
      </PopoverRoot>
      <div className="hover:bg-yellow-300 p-1 rounded"><MdOutlineEdit/></div>
      <div className="py-3 mx-1 rounded"></div>
      <div className="hover:bg-red-300 p-1 rounded" onClick={deleteItem}><MdDeleteForever/></div>
    </div>
  );
}

export default MessageHeader;
export type {IMessageHeaderProps};
