import axios from "axios";

export const aipeReqInstance = axios.create({baseURL: 'http://localhost:3000/api/aipe/', timeout: 3000,});


const baseQueryPrefix = 'chats';
export const queryKeys = {
  chatList: () => [baseQueryPrefix, 'list'],
  chat: (chatId: string) => [baseQueryPrefix, chatId],
  span: (spanId: string) => [baseQueryPrefix, 'span', spanId],
  chain: (chainId: string) => [baseQueryPrefix, 'chain', chainId],
  chainItem: (itemId: string) => [baseQueryPrefix, 'chainItem', itemId],

  fact: (factId: string) => [baseQueryPrefix, 'fact', factId],
  assumption: (assumptionId: string) => [baseQueryPrefix, 'assumption', assumptionId],
  goal: (goalId: string) => [baseQueryPrefix, 'goal', goalId],
  guideline: (guidelineId: string) => [baseQueryPrefix, 'guideline', guidelineId],
}
