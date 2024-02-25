import React from 'react';
import {TUserMessage} from "../types/dataTypes";
import MessageHeader from "./MsgHeader";

interface IUserMessageProps extends Omit<TUserMessage, 'id'> {
  itemId: string;
}

const MessageUser: React.FC<IUserMessageProps> = (props) => {
  return (
    <div className="bg-yellow-50 p-2 mb-1 rounded shadow">
      <MessageHeader
        itemId={props.itemId}
        createdAt={props.created_at}
        updatedAt={props.updated_at}
        itemRole={props.item_role}
        itemType={props.item_type}
        authorName={props.name}
        tokenCount={props.token_count}
      />
      {props.text_content && <p>{props.text_content}</p>}
    </div>
  );
};

export default MessageUser;
export type {IUserMessageProps};
