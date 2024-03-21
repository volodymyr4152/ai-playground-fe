import React, {useEffect, useRef, useState} from 'react';
import {TSystemMessage} from "../types/dataTypes";
import MessageHeader from "./MsgHeader";
import {MessageTextBody} from "./MessageTextBody";
import {useChainItemContext} from "../contexts/chatContexts";
import {useUpdateChainItem} from "../hooks/useChainItemApi";
import {GenericMessageComponent} from "./GenericMessageComponent";

interface ISystemMessageProps extends TSystemMessage {
  itemId: string;
}


const MessageSystem: React.FC<ISystemMessageProps> = ({
  itemId, created_at, updated_at, item_role, name, text_content, token_count, item_type, text_content_template
}) => {
  return <GenericMessageComponent
    itemId={itemId}
    created_at={created_at}
    updated_at={updated_at}
    item_role={item_role}
    name={name}
    text_content={text_content}
    token_count={token_count}
    item_type={item_type}
    text_content_template={text_content_template}
    dataId="system-message"
    accentColor="purple"
  />
};

export default MessageSystem;
export type {ISystemMessageProps};
