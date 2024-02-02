import {components} from "./ai-playground-types";


export type TChatCallChain = components['schemas']['ChatCallChain'];
export type TChatItemMultiType = components['schemas']['ChatItemMultiType'];
export type TChatSpan = components['schemas']['ChatSpan'];
export type TContextAssumption = components['schemas']['ContextAssumption'];
export type TContextFact = components['schemas']['ContextFact'];
export type TContextGoal = components['schemas']['ContextGoal'];
export type TContextGuideline = components['schemas']['ContextGuideline'];
export type TConversationContext = components['schemas']['ConversationContext'];
export type TFinishReasonEnum = components['schemas']['FinishReasonEnum'];
export type TItemRoleEnum = components['schemas']['ItemRoleEnum'];
export type TPatchedConversationContext = components['schemas']['PatchedConversationContext'];

export type TAssistantMessage = components['schemas']['AssistantMessageTyped'];
export type TSystemMessage = components['schemas']['SystemMessageTyped'];
export type TToolMessage = components['schemas']['ToolMessageTyped'];
export type TUserMessage = components['schemas']['UserMessageTyped'];
