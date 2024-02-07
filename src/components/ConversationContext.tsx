import React, {useMemo, useRef} from 'react';
import {
  TChatSpan,
  TContextAssumption,
  TContextFact,
  TContextGoal,
  TContextGuideline,
  TConversationContext
} from '../types/contextTypes';
import ChatSpan from "./ChatSpan";

interface IConversationContextProps {
  conversationContext: TConversationContext;
  selectedSpanId?: string;
  selectedCallChainId?: string;
  setSelectedSpanId?: (spanId: string) => void;
  setSelectedChainId?: (chainId: string) => void;
}

const ConversationContext: React.FC<IConversationContextProps> = (props) => {
  const spanRefs = useRef({});
  props.conversationContext.spans.forEach((span: TChatSpan) => {
    spanRefs.current[span.id] = React.createRef();
  })
  setTimeout(() => {
    if (props.selectedSpanId && spanRefs.current[props.selectedSpanId]) {
      spanRefs.current[props.selectedSpanId].current.scrollIntoView({behavior: 'smooth'});
    }
  }, 1000);
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-2">Conversation Context</h2>
      <div className="mb-4">
        <h3 className="text-md font-bold">Goals:</h3>
        <ul className="list-disc ml-6">
          {props.conversationContext.goals.map((goal: TContextGoal, index: number) => (
            <li key={index}>{goal.goal}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-bold">Guidelines:</h3>
        <ul className="list-disc ml-6">
          {props.conversationContext.guidelines.map((guideline: TContextGuideline, index: number) => (
            <li key={index}>{guideline.guideline}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-md font-bold">Facts:</h3>
          <ul className="list-disc ml-6">
            {props.conversationContext.facts.map((fact: TContextFact, index: number) => (
              <li key={index}>{fact.fact}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-md font-bold">Assumptions:</h3>
          <ul className="list-disc ml-6">
            {props.conversationContext.assumptions.map((assumption: TContextAssumption, index: number) => (
              <li key={index}>{assumption.assumption}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-bold">Spans:</h3>
        {props.conversationContext.spans.map((span: TChatSpan, index: number) => (
          <ChatSpan ref={spanRefs[span.id]} key={span.id} span={span}/>
        ))}
      </div>
    </div>
  );
};

export default ConversationContext;
