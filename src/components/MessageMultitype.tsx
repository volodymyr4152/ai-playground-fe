import React, {useMemo} from 'react';
import MessageAssistant, {IAssistantMessageProps} from "./MessageAssistant";
import ToolMessage, {IToolMessageProps} from "./MessageToolCall";
import MessageUser, {IUserMessageProps} from "./MessageUser";
import MessageSystem, {ISystemMessageProps} from "./MessageSystem";
import {ChainItemContextProvider} from "../contexts/chatContexts";
import {useChainItemQuery} from "../hooks/useChainItemApi";
import MessageIndication, {IIndicationMessageProps} from "./MessageIndication";

interface IChatMessageProps {
  itemId: string
}

const MessageItem: React.FC<IChatMessageProps> = ({ itemId }) => {
  const {data: itemData} = useChainItemQuery(itemId);
  // @ts-ignore
  const templateAvailable = !!itemData?.text_content_template;
  const contextProps = useMemo(() => ({itemId, templateAvailable}), [itemId, templateAvailable]);
  if (!itemData) {
    return <div>Loading...</div>;
  }

  if (itemData.item_type === 'assistant') {
    return <ChainItemContextProvider value={contextProps}>
      <MessageAssistant itemId={itemData.id} {...(itemData as IAssistantMessageProps)} />
    </ChainItemContextProvider>
  } else if (itemData.item_type === 'tool') {
    return <ChainItemContextProvider value={contextProps}>
      <ToolMessage itemId={itemData.id} {...(itemData as IToolMessageProps)} />
    </ChainItemContextProvider>
  } else if (itemData.item_type === 'user') {
    return <ChainItemContextProvider value={contextProps}>
      <MessageUser itemId={itemData.id} {...(itemData as IUserMessageProps)} />
    </ChainItemContextProvider>
  } else if (itemData.item_type === 'system') {
    return <ChainItemContextProvider value={contextProps}>
      <MessageSystem itemId={itemData.id} {...(itemData as ISystemMessageProps)} />
    </ChainItemContextProvider>
  } else if (itemData.item_type === 'uiIndication') {
    return <MessageIndication {...(itemData as unknown as IIndicationMessageProps)} />
  } else {
    return <div className="bg-red-400 p-2">
      <p>Message Type: {itemData.item_type}</p>
    </div>
  }
};

export default MessageItem;
export type {IChatMessageProps};
