import React from 'react';
import {TChatItemMultiType} from "../types/contextTypes";
import MessageAssistant, {IAssistantMessageProps} from "./MessageAssistant";
import ToolMessage, {IToolMessageProps} from "./MessageToolCall";
import MessageUser, {IUserMessageProps} from "./MessageUser";
import MessageSystem, {ISystemMessageProps} from "./MessageSystem";

interface IChatMessageProps extends Omit<TChatItemMultiType, 'id' > {
  itemId: string;
}

const MessageItem: React.FC<IChatMessageProps> = (chatItem) => {
  if (chatItem.item_type === 'assistant') {
    return <MessageAssistant {...(chatItem as IAssistantMessageProps)} />
  } else if (chatItem.item_type === 'tool') {
    return <ToolMessage {...(chatItem as IToolMessageProps)} />
  } else if (chatItem.item_type === 'user') {
    return <MessageUser {...(chatItem as IUserMessageProps)} />
  } else if (chatItem.item_type === 'system') {
    return <MessageSystem {...(chatItem as ISystemMessageProps)} />
  } else {
    return <div className="mb-2">
      <p>Message Type: {chatItem.item_type}</p>
    </div>
  }
};

export default MessageItem;
export type {IChatMessageProps};
