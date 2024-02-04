import React from "react";
import Moment from "react-moment";
import {Badge} from "flowbite-react";

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

  return (
    <div className="flex flex-wrap items-center space-x-2" data-role="message-header">
      {isNameVisible && <Badge key="authorName" color={mainColor} size="s">Name: {props.authorName}</Badge>}
      <Badge key="type" color={mainColor} size="s" className="min-w-28">{props.itemType}</Badge>
      <Badge key="role" color={mainColor} size="s">{props.itemRole}</Badge>
      <Badge key="creationTime" color="gray">
        created:<Moment format="HH:mm YYYY-MM-DD">{props.createdAt}</Moment>
      </Badge>
      <Badge key="updateTime" color="gray">
        updated:<Moment format="HH:mm YYYY-MM-DD">{props.updatedAt}</Moment>
      </Badge>
      {/*<Badge key="systemId" color="gray">ID:{props.itemId}</Badge>*/}
      {isTokenCountVisible && <Badge key="tokenCount" color="gray">Token Count: {props.tokenCount}</Badge>}
    </div>
  );
}

export default MessageHeader;
export type {IMessageHeaderProps};
