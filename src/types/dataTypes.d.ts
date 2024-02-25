import {components} from "./ai-playground-types";


export type TChat = components['schemas']['ConversationContext'];

export type TAssumption = components['schemas']['ContextAssumption'];
export type TFact = components['schemas']['ContextFact'];
export type TGoal = components['schemas']['ContextGoal'];
export type TGuideline = components['schemas']['ContextGuideline'];

export type TChatSpan = components['schemas']['ChatSpan'];
export type TChatCallChain = components['schemas']['ChatCallChain'];

export type TChatItemMultiType = components['schemas']['ChatItemMultiType'];
export type TItemRoleEnum = components['schemas']['ItemRoleEnum'];
export type TMessageItemType = "assistant" | "system" | "tool" | "user";

export type TSystemMessage = components['schemas']['SystemMessageTyped'];

export type TUserMessage = components['schemas']['UserMessageTyped'];

export type TAssistantMessage = components['schemas']['AssistantMessageTyped'];
export type TFinishReasonEnum = components['schemas']['FinishReasonEnum'];

export type TToolMessage = components['schemas']['ToolMessageTyped'];
export type TToolCall = components['schemas']['ToolCallRequest'];
