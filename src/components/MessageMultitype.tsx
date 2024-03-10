import React from 'react';
import MessageAssistant, {IAssistantMessageProps} from "./MessageAssistant";
import ToolMessage, {IToolMessageProps} from "./MessageToolCall";
import MessageUser, {IUserMessageProps} from "./MessageUser";
import MessageSystem, {ISystemMessageProps} from "./MessageSystem";
import {TChatItemMultiType} from "../types/dataTypes";
import {ChainItemContextProvider} from "../contexts/chatContexts";
import {useChainItemQuery} from "../hooks/useChainItemApi";

interface IChatMessageProps {
  itemId: string
}

const MessageItem: React.FC<IChatMessageProps> = ({ itemId }) => {
  const {data: itemData} = useChainItemQuery(itemId);

  if (!itemData) {
    return <div>Loading...</div>;
  }

  if (itemData.item_type === 'assistant') {
    return <ChainItemContextProvider value={{itemId: itemData.id}}>
      <MessageAssistant itemId={itemData.id} {...(itemData as IAssistantMessageProps)} />
    </ChainItemContextProvider>
  } else if (itemData.item_type === 'tool') {
    return <ChainItemContextProvider value={{itemId: itemData.id}}>
      <ToolMessage itemId={itemData.id} {...(itemData as IToolMessageProps)} />
    </ChainItemContextProvider>
  } else if (itemData.item_type === 'user') {
    return <ChainItemContextProvider value={{itemId: itemData.id}}>
      <MessageUser itemId={itemData.id} {...(itemData as IUserMessageProps)} />
    </ChainItemContextProvider>
  } else if (itemData.item_type === 'system') {
    return <ChainItemContextProvider value={{itemId: itemData.id}}>
      <MessageSystem itemId={itemData.id} {...(itemData as ISystemMessageProps)} />
    </ChainItemContextProvider>
  } else {
    return <div className="mb-2 bg-red-400 p-2">
      <p>Message Type: {itemData.item_type}</p>
    </div>
  }
};

export default MessageItem;
export type {IChatMessageProps};
