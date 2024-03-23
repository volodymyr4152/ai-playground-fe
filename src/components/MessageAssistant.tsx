import React from 'react';
import {TAssistantMessage, TToolCall} from "../types/dataTypes";
import MessageHeader from "./MessageHeader";
import {Badge} from "flowbite-react";
import {MessageTextBody} from "./MessageTextBody";
import {GenericMessageComponent} from "./GenericMessageComponent";

interface IAssistantMessageProps extends TAssistantMessage {
  itemId: string;
}


interface IToolCall extends Omit<TToolCall, 'id'> {
  callRecordId: string;
}


const ToolCallBadge: React.FC<IToolCall> = (toolCall) => {
  return <div className="flex flex-row items-start space-x-2">
    <MessageTextBody messageText={`\`${toolCall.tool_name}(${toolCall.tool_arguments_raw}\``}/>
    <Badge color="gray">{toolCall.call_id}</Badge>
  </div>
};


const MessageAssistant: React.FC<IAssistantMessageProps> = ({
  itemId, created_at, updated_at, item_role, name, text_content, token_count, finish_reason, item_type,
  tool_call_requests, text_content_template
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
    accentColor="blue"
    dataId="assistant-message"
    text_content_template={text_content_template}
  >
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
  </GenericMessageComponent>;
};

export default MessageAssistant;
export type {IAssistantMessageProps};
