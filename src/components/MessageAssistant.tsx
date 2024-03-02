import React from 'react';
import {TAssistantMessage, TToolCall} from "../types/dataTypes";
import MessageHeader from "./MsgHeader";
import {Badge} from "flowbite-react";

interface IAssistantMessageProps extends TAssistantMessage {
  itemId: string;
}


interface IToolCall extends Omit<TToolCall, 'id'> {
  callRecordId: string;
}


const ToolCallBadge: React.FC<IToolCall> = (toolCall) => {
  return <div className="flex items-center space-x-2">
    <Badge color="warning" size="s">{toolCall.tool_name}({toolCall.tool_arguments_raw})</Badge>
    <Badge color="gray">{toolCall.call_id}</Badge>
  </div>
};


const MessageAssistant: React.FC<IAssistantMessageProps> = ({ itemId, created_at, updated_at, item_role, name, text_content, token_count, finish_reason, item_type, tool_call_requests }) => {
  return (
    <div className="bg-blue-50 p-2 mb-1 rounded shadow">
      <MessageHeader
        itemId={itemId}
        createdAt={created_at}
        updatedAt={updated_at}
        itemRole={item_role}
        itemType={item_type}
        authorName={name}
        tokenCount={token_count}
      />
      {text_content && <p>{text_content}</p>}
      {/*{finish_reason && <p>Finish Reason: {finish_reason}</p>}*/}
      {tool_call_requests.map((toolCall) => {
        return <ToolCallBadge
          key={toolCall.id}
          callRecordId={toolCall.id}
          created_at={toolCall.created_at}
          updated_at={toolCall.updated_at}
          call_id={toolCall.call_id}
          tool_name={toolCall.tool_name}
          tool_arguments_raw={toolCall.tool_arguments_raw}
        />
      })}
    </div>
  );
};

export default MessageAssistant;
export type {IAssistantMessageProps};
