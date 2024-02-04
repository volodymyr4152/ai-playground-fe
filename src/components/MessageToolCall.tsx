import React from 'react';
import {TToolMessage} from "../types/contextTypes";
import MessageHeader from "./MsgHeader";


interface IToolMessageProps extends Omit<TToolMessage, 'id'> {
  itemId: string;
}


const ToolMessage: React.FC<IToolMessageProps> = ({
                                                    itemId,
                                                    created_at,
                                                    updated_at,
                                                    item_role,
                                                    call_id,
                                                    tool_name,
                                                    tool_arguments_raw,
                                                    status,
                                                    computed_result,
                                                    token_count,
                                                    item_type
                                                  }) => {
  return (
    <div className="bg-green-100 p-4 mb-4 rounded shadow">
      <MessageHeader
        itemId={itemId}
        createdAt={created_at}
        updatedAt={updated_at}
        itemRole={item_role}
        itemType={item_type}
        tokenCount={token_count}
        status={status}
        callId={call_id}
      />
      <p>{tool_name}({tool_arguments_raw})</p>
      <p>{computed_result}</p>
    </div>
  );
};

export default ToolMessage;
export type {IToolMessageProps};
