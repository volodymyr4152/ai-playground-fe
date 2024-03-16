import React from 'react';
import {
  TChatSpan,
  TAssumption,
  TFact,
  TGoal,
  TGuideline
} from '../types/dataTypes';
import ChatSpan from "./ChatSpan";
import {useChatQuery} from "../hooks/useChatsApi";
import {ChatContextProvider} from "../contexts/chatContexts";

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
      <h3 className="text-md font-bold">Goals:</h3>
      <ul className="list-disc ml-6">
        {chatData.goals.map((goal: TGoal, index: number) => (
          <li key={index}>{goal.goal}</li>
        ))}
      </ul>
    </div>

    <div className="mb-4">
      <h3 className="text-md font-bold">Guidelines:</h3>
      <ul className="list-disc ml-6">
        {chatData.guidelines.map((guideline: TGuideline, index: number) => (
          <li key={index}>{guideline.guideline}</li>
        ))}
      </ul>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-md font-bold">Facts:</h3>
        <ul className="list-disc ml-6">
          {chatData.facts.map((fact: TFact, index: number) => (
            <li key={index}>{fact.fact}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-md font-bold">Assumptions:</h3>
        <ul className="list-disc ml-6">
          {chatData.assumptions.map((assumption: TAssumption, index: number) => (
            <li key={index}>{assumption.assumption}</li>
          ))}
        </ul>
      </div>
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
