import React from 'react';
import {
  TChatSpan,
  TAssumption,
  TFact,
  TGoal,
  TGuideline,
  TChat
} from '../types/contextTypes';
import ChatSpan from "./ChatSpan";

interface IChatProps {
  chat: TChat;
}

const Chat: React.FC<IChatProps> = (props) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-1 flex-grow">
      <h2 className="text-lg font-bold mb-2">Conversation Context</h2>
      <div className="mb-4">
        <h3 className="text-md font-bold">Goals:</h3>
        <ul className="list-disc ml-6">
          {props.chat.goals.map((goal: TGoal, index: number) => (
            <li key={index}>{goal.goal}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-bold">Guidelines:</h3>
        <ul className="list-disc ml-6">
          {props.chat.guidelines.map((guideline: TGuideline, index: number) => (
            <li key={index}>{guideline.guideline}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-md font-bold">Facts:</h3>
          <ul className="list-disc ml-6">
            {props.chat.facts.map((fact: TFact, index: number) => (
              <li key={index}>{fact.fact}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-bold">Assumptions:</h3>
          <ul className="list-disc ml-6">
            {props.chat.assumptions.map((assumption: TAssumption, index: number) => (
              <li key={index}>{assumption.assumption}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-md font-bold">Spans:</h3>
        {props.chat.spans.map((span: TChatSpan) => (
          <ChatSpan key={span.id} span={span}/>
        ))}
      </div>
    </div>
  );
};

export default Chat;
