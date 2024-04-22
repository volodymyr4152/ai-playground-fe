import React from 'react';
import {TToolMessage} from "../types/dataTypes";
import MessageHeader from "./MessageHeader";
import {MessageTextBody} from "./MessageTextBody";


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
  let renderText = call_request.computed_result;
  const codeTags = (renderText) ? (renderText.match(/```/g) || []).length : 0;
  renderText = codeTags > 0 ? renderText : "```" + renderText + "```";
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
        isEditable={false}
      />
      <div className="flex flex-col items-start mt-1">
        <MessageTextBody
          messageText={`\`\`\`${call_request.tool_name}(${call_request.tool_arguments_raw})\`\`\``}
          isEditable={false}
        />
        <MessageTextBody
          messageText={renderText}
          isEditable={false}
        />
      </div>
    </div>
  );
};

export default ToolMessage;
export type {IToolMessageProps};
