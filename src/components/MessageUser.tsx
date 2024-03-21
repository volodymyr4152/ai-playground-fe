import React from 'react';
import {TUserMessage} from "../types/dataTypes";
import MessageHeader from "./MsgHeader";
import {MessageTextBody} from "./MessageTextBody";
import {GenericMessageComponent} from "./GenericMessageComponent";

interface IUserMessageProps extends TUserMessage {
  itemId: string;
}

const MessageUser: React.FC<IUserMessageProps> = (props) => {
  return <GenericMessageComponent
    itemId={props.itemId}
    created_at={props.created_at}
    updated_at={props.updated_at}
    item_role={props.item_role}
    name={props.name}
    text_content={props.text_content}
    token_count={props.token_count}
    item_type={props.item_type}
    text_content_template={props.text_content_template}
    accentColor="yellow"
    dataId="user-message"
  />
};

export default MessageUser;
export type {IUserMessageProps};
