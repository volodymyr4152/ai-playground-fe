import React from 'react';
import {
  TChatSpan,
  TContextAssumption,
  TContextFact,
  TContextGoal,
  TContextGuideline,
  TConversationContext
} from '../types/contextTypes';
import ChatSpan from "./ChatSpan";

const ConversationContext: React.FC<{ conversationContext: TConversationContext }> = ({ conversationContext }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-2">Conversation Context</h2>
      <div className="mb-4">
        <h3 className="text-md font-bold">Goals:</h3>
        <ul className="list-disc ml-6">
          {conversationContext.goals.map((goal: TContextGoal, index: number) => (
            <li key={index}>{goal.goal}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-bold">Guidelines:</h3>
        <ul className="list-disc ml-6">
          {conversationContext.guidelines.map((guideline: TContextGuideline, index: number) => (
            <li key={index}>{guideline.guideline}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-md font-bold">Facts:</h3>
          <ul className="list-disc ml-6">
            {conversationContext.facts.map((fact: TContextFact, index: number) => (
              <li key={index}>{fact.fact}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-bold">Assumptions:</h3>
          <ul className="list-disc ml-6">
            {conversationContext.assumptions.map((assumption: TContextAssumption, index: number) => (
              <li key={index}>{assumption.assumption}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-bold">Spans:</h3>
        {conversationContext.spans.map((span: TChatSpan, index: number) => (
          <ChatSpan key={span.id} span={span} />
        ))}
      </div>
    </div>
  );
};

export default ConversationContext;
