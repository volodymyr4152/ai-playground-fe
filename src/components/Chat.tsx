import React from 'react';
import { TChatSpan, TMemoItem } from '../types/dataTypes';
import ChatSpan from "./ChatSpan";
import {useChatQuery} from "../hooks/useChatsApi";
import {ChatContextProvider} from "../contexts/chatContexts";
import MemoItem from "./MemoItem";

interface IChatProps {
  chatId: string
  className?: string
}

const Chat: React.FC<IChatProps> = ({chatId, className}) => {
  const {data: chatData} = useChatQuery(chatId);

  if (!chatData) {
    return <div>Loading...</div>;
  }

  return <ChatContextProvider value={{chatId}}>
    <div className={"bg-white flex-grow " + className}>
    <h2 className="text-lg font-bold mb-2">Conversation Context</h2>
    <div className="mb-4">
      <h3 className="text-md font-bold">Memo items:</h3>
      <ul className="list-disc ml-6">
        {chatData.memo_items.map((memoItem: TMemoItem, index: number) => (
          <li key={memoItem.segment + memoItem.short_id}>
            <MemoItem content={memoItem.content} shortId={memoItem.short_id} segment={memoItem.segment}/>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="text-md font-bold">Spans:</h3>
      {chatData.spans.map((span: TChatSpan) => (
        <ChatSpan key={span.id} spanId={span.id}/>
      ))}
    </div>

    <div className="w-full h-96"></div>
  </div>
  </ChatContextProvider>;
};

export default Chat;
