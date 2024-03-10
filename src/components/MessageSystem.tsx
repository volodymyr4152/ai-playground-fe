import React from 'react';
import {TSystemMessage} from "../types/dataTypes";
import MessageHeader from "./MsgHeader";
import Markdown from "react-markdown";
import codeblocks from "remark-code-blocks";

interface ISystemMessageProps extends TSystemMessage {
  itemId: string;
}


const MessageSystem: React.FC<ISystemMessageProps> = ({
  itemId, created_at, updated_at, item_role, name, text_content, token_count, item_type
}) => {
  return <div className="bg-purple-50 p-2 rounded shadow" data-id="system-message">
    <MessageHeader
      itemId={itemId}
      createdAt={created_at}
      updatedAt={updated_at}
      itemRole={item_role}
      itemType={item_type}
      authorName={name}
      tokenCount={token_count}
    />
    {text_content && <Markdown remarkPlugins={[codeblocks]}>{text_content.replace("\n", "\n\n")}</Markdown>}
  </div>;
};

export default MessageSystem;
export type {ISystemMessageProps};
