import React from "react";
import MDEditor from '@uiw/react-md-editor';
import {useChainItemContext} from "../contexts/chatContexts";


interface IMessageBodyEditorProps {
  messageText: string;
  onMessageTextChange?: (newText: string) => void;
}

export const MessageBodyEditor: React.FC<IMessageBodyEditorProps> = ({ messageText, onMessageTextChange }) => {
  return <div className="bg-white p-2 rounded shadow" data-color-mode="light">
    <MDEditor
      className="w-full min-h-16 h-auto"
      height="auto"
      value={messageText}
      onChange={onMessageTextChange}
    />
  </div>
}
