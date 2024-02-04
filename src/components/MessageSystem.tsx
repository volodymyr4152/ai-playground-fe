import React from 'react';
import {TSystemMessage} from "../types/contextTypes";
import MessageHeader from "./MsgHeader";

interface ISystemMessageProps extends Omit<TSystemMessage, 'id'> {
  itemId: string;
}


const MessageSystem: React.FC<ISystemMessageProps> = ({
  itemId, created_at, updated_at, item_role, name, text_content, token_count, item_type
}) => {
  return <div className="bg-purple-100 p-4 mb-4 rounded shadow" data-id="system-message">
    <MessageHeader
      itemId={itemId}
      createdAt={created_at}
      updatedAt={updated_at}
      itemRole={item_role}
      itemType={item_type}
      authorName={name}
      tokenCount={token_count}
    />
    {text_content && <p>Text Content: {text_content}</p>}
  </div>;
};

export default MessageSystem;
export type {ISystemMessageProps};
