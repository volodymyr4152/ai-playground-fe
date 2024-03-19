import React, {Fragment, useCallback} from "react";
import Moment from "react-moment";
import {Badge} from "flowbite-react";
import {MdDeleteForever, MdInfoOutline, MdOutlineEdit} from "react-icons/md";
import CopyBadge from "./CopyBadge";
import {ModPopover} from "./ModPopover";
import {useDeleteChainItem} from "../hooks/useChainItemApi";
import {useChainContext, useChainItemContext} from "../contexts/chatContexts";
import {ImInsertTemplate} from "react-icons/im";

interface IMessageHeaderProps {
  itemId?: string;
  createdAt: string;
  updatedAt: string;
  itemRole: string;
  itemType: string;
  tokenCount?: number;
  authorName?: string;
  status?: string; // for tool calls
  callId?: string; // for tool calls
  isEditable?: boolean;
  isDeletable?: boolean;
}

const colorByType = {
  assistant: 'blue',
  tool: 'green',
  user: 'yellow',
  system: 'purple',
  uiIndication: 'gray',
  default: 'red'
}


const MessageHeader: React.FC<IMessageHeaderProps> = (props) => {
  const mainColor = colorByType[props.itemType] || colorByType.default;
  const isNameVisible = (props.authorName !== undefined && props.authorName !== null && props.authorName !== "");
  const isTokenCountVisible = (props.tokenCount !== undefined && props.tokenCount !== null && props.tokenCount > 0);
  const itemId = props.itemId;

  const isEditable = props.isEditable ?? true;
  const isDeletable = props.isDeletable ?? true;
  const {templateVisible, setTemplateVisible, editMode, setEditMode} = useChainItemContext();

  const {chainId} = useChainContext();
  const deleteItemMutation = useDeleteChainItem();
  const deleteItem = useCallback(
    () => deleteItemMutation.mutate({itemId: itemId, chainId}),
    [itemId, chainId, deleteItemMutation]
  )

  return (
    <div className="flex flex-wrap items-center space-x-2" data-role="message-header" key={itemId ?? 'no-id'}>
      {isNameVisible && <Badge key="authorName" color={mainColor} size="s">Name: {props.authorName}</Badge>}
      <Badge key="type" color={mainColor} size="s" className="min-w-20">{props.itemType}</Badge>
      <ModPopover
        triggerChild={<MdInfoOutline/>}
        contentChild={<Fragment>
          <Badge key="role" color={mainColor}>{props.itemRole}</Badge>
          <CopyBadge key="creationTime" color="gray" copyContent={props.createdAt}>
            created:<Moment format="HH:mm YYYY-MM-DD">{props.createdAt}</Moment>
          </CopyBadge>
          <CopyBadge key="updateTime" color="gray" copyContent={props.updatedAt}>
            updated:<Moment format="HH:mm YYYY-MM-DD">{props.updatedAt}</Moment>
          </CopyBadge>
          {itemId && <CopyBadge key="systemId" color="gray" copyContent={itemId}>ID:{itemId}</CopyBadge>}
          {isTokenCountVisible && <Badge key="tokenCount" color="gray">Token Count: {props.tokenCount}</Badge>}
          {props.callId && <CopyBadge key="callId" color="gray" copyContent={props.callId}>
              Call ID: {props.callId}
          </CopyBadge>}
        </Fragment>}
      />
      {isEditable && <div
        className={"hover:bg-yellow-300 p-1 rounded" + (editMode ? " bg-yellow-300" : "")}
        onClick={() => setEditMode(!editMode)}
      ><MdOutlineEdit/></div>
      }
      {isEditable && <div
        className={"hover:bg-yellow-300 p-1 rounded" + (templateVisible ? " bg-yellow-300" : "")}
        onClick={() => setTemplateVisible(!templateVisible)}
      ><ImInsertTemplate /></div>
      }
      <div className="py-3 mx-1"></div>
      {isDeletable && <div className="hover:bg-red-300 p-1 rounded" onClick={deleteItem}><MdDeleteForever/></div>}
    </div>
  );
}

export default MessageHeader;
export type {IMessageHeaderProps};
