import {components} from "./ai-playground-types";


export type TIndicationMessage = {
  id: string; // something like "indication-<uuid>"
  item_type: "uiIndication";
  "status": "loading" | "error" | "warning" | "info" | "success";
  created_at: string;
  updated_at?: string;
  item_role?: string;
  text_content?: string;
}

export type TChat = components['schemas']['ConversationContext'];

export type TAssumption = components['schemas']['ContextAssumption'];
export type TFact = components['schemas']['ContextFact'];
export type TGoal = components['schemas']['ContextGoal'];
export type TGuideline = components['schemas']['ContextGuideline'];

export type TChatSpan = components['schemas']['ChatSpan'];
export type TChatCallChain = Omit<components['schemas']['ChatCallChain'], "items"> & {
  items: TChatItemMultiType[];
};

export type TChatItemMultiType = components['schemas']['ChatItemMultiType'] | TIndicationMessage;
export type TItemRoleEnum = components['schemas']['ItemRoleEnum'];
export type TMessageItemType = "assistant" | "system" | "tool" | "user";

export type TSystemMessage = components['schemas']['SystemMessageTyped'];

export type TUserMessage = components['schemas']['UserMessageTyped'];

export type TAssistantMessage = components['schemas']['AssistantMessageTyped'];
export type TFinishReasonEnum = components['schemas']['FinishReasonEnum'];

export type TToolMessage = components['schemas']['ToolMessageTyped'];
export type TToolCall = components['schemas']['ToolCallRequest'];

export type TTextTemplate = components['schemas']['MessageContentTemplate'];
