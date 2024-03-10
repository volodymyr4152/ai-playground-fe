import React from 'react';
import {TToolMessage} from "../types/dataTypes";
import MessageHeader from "./MsgHeader";


interface IToolMessageProps extends TToolMessage {
  itemId: string;
}


const ToolMessage: React.FC<IToolMessageProps> = ({
  itemId,
  created_at,
  updated_at,
  item_role,
  call_request,
  token_count,
  item_type
}) => {
  return (
    <div className="bg-green-50 p-2 rounded shadow">
      <MessageHeader
        itemId={itemId}
        createdAt={created_at}
        updatedAt={updated_at}
        itemRole={item_role}
        itemType={item_type}
        tokenCount={token_count}
        status={call_request.status}
        callId={call_request.call_id}
      />
      <p>{call_request.tool_name}({call_request.tool_arguments_raw}) -&gt; {call_request.computed_result}</p>
    </div>
  );
};

export default ToolMessage;
export type {IToolMessageProps};
