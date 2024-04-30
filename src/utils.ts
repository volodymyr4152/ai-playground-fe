import axios from "axios";

export const aipeReqInstance = axios.create({baseURL: 'http://localhost:3000/api/aipe/', timeout: 20000,});

export const shikijsHighlighterTheme = 'nord';

export const baseQueryPrefixes = {
  chat: 'chat',
  span: 'span',
  chain: 'chain',
  chainItem: 'chainItem',
  memoItem: 'memoItem',
  variable: 'variable',
};
export const queryKeys = {
  chatList: () => [baseQueryPrefixes.chat, 'list'],
  chat: (chatId: string) => [baseQueryPrefixes.chat, chatId],
  span: (spanId: string) => [baseQueryPrefixes.span,  spanId],
  chain: (chainId: string) => [baseQueryPrefixes.chain, chainId],
  chainItem: (itemId: string) => [baseQueryPrefixes.chainItem, itemId],
  memoItems: (memoItemId: string) => [baseQueryPrefixes.memoItem, memoItemId],
  textTemplate: (templateId: string) => ['textTemplate', templateId],
  variable: (varId: string) => [baseQueryPrefixes.variable, varId],
}
