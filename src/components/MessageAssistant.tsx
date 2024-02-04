import React from 'react';
import {TAssistantMessage} from "../types/contextTypes";
import MessageHeader from "./MsgHeader";

interface IAssistantMessageProps extends Omit<TAssistantMessage, 'id'> {
  itemId: string;
}

const MessageAssistant: React.FC<IAssistantMessageProps> = ({ itemId, created_at, updated_at, item_role, name, text_content, token_count, finish_reason, item_type }) => {
  return (
    <div className="bg-blue-100 p-4 mb-4 rounded shadow">
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
      {finish_reason && <p>Finish Reason: {finish_reason}</p>}
    </div>
  );
};

export default MessageAssistant;
export type {IAssistantMessageProps};
