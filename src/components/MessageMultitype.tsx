import React from 'react';
import MessageAssistant, {IAssistantMessageProps} from "./MessageAssistant";
import ToolMessage, {IToolMessageProps} from "./MessageToolCall";
import MessageUser, {IUserMessageProps} from "./MessageUser";
import MessageSystem, {ISystemMessageProps} from "./MessageSystem";
import {useChainItemCtx} from "../contexts/ChainItemCtx";

interface IChatMessageProps {
}

const MessageItem: React.FC<IChatMessageProps> = () => {
  const { isLoading, itemData } = useChainItemCtx();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (itemData.item_type === 'assistant') {
    return <MessageAssistant itemId={itemData.id} {...(itemData as IAssistantMessageProps)} />
  } else if (itemData.item_type === 'tool') {
    return <ToolMessage itemId={itemData.id} {...(itemData as IToolMessageProps)} />
  } else if (itemData.item_type === 'user') {
    return <MessageUser itemId={itemData.id} {...(itemData as IUserMessageProps)} />
  } else if (itemData.item_type === 'system') {
    return <MessageSystem itemId={itemData.id} {...(itemData as ISystemMessageProps)} />
  } else {
    return <div className="mb-2">
      <p>Message Type: {itemData.item_type}</p>
    </div>
  }
};

export default MessageItem;
export type {IChatMessageProps};
