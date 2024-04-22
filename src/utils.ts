import axios from "axios";

export const aipeReqInstance = axios.create({baseURL: 'http://localhost:3000/api/aipe/', timeout: 20000,});

export const shikijsHighlighterTheme = 'nord';

export const baseQueryPrefixes = {
  chat: 'chat',
  span: 'span',
  chain: 'chain',
  chainItem: 'chainItem',
  memoItem: 'memoItem',
};
export const queryKeys = {
  chatList: () => [baseQueryPrefixes.chat, 'list'],
  chat: (chatId: string) => [baseQueryPrefixes.chat, chatId],
  span: (spanId: string) => [baseQueryPrefixes.span,  spanId],
  chain: (chainId: string) => [baseQueryPrefixes.chain, chainId],
  chainItem: (itemId: string) => [baseQueryPrefixes.chainItem, itemId],
  memoItems: (memoItemId: string) => [baseQueryPrefixes.memoItem, memoItemId],
  textTemplate: (templateId: string) => ['textTemplate', templateId],
}

// export const mutationKeys = {
//   chat: {
//     add: () => [...queryKeys.chatList(), 'add'],
//     update: (chatId: string) => [...queryKeys.chat(chatId), 'update'],
//     delete: (chatId: string) => [...queryKeys.chat(chatId), 'delete'],
//   },
//   span: {
//     add: (chatId: string) => [...queryKeys.chat(chatId), 'add', 'span'],
//     update: (spanId: string) => [...queryKeys.span(spanId), 'update'],
//     delete: (spanId: string) => [...queryKeys.span(spanId), 'delete'],
//   },
//   chain: {
//     add: (spanId: string) => [...queryKeys.span(spanId), 'add', 'chain'],
//     update: (chainId: string) => [...queryKeys.chain(chainId), 'update'],
//     delete: (chainId: string) => [...queryKeys.chain(chainId), 'delete'],
//   },
//   chainItem: {
//     add: (chainId: string) => [...queryKeys.chain(chainId), 'add', 'chainItem'],
//     update: (itemId: string) => [...queryKeys.chainItem(itemId), 'update'],
//     delete: (itemId: string) => [...queryKeys.chainItem(itemId), 'delete'],
//   },
// }
