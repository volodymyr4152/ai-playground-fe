import axios from "axios";

export const aipeReqInstance = axios.create({baseURL: 'http://localhost:3000/api/aipe/', timeout: 3000,});


// QKP = Query Key Prefix
export const QKP = {
  chatList: 'chatList',
  chat: 'chat',
  span: 'span',
  chain: 'chain',
  chainItem: 'chainItem',

  fact: 'fact',
  assumption: 'assumption',
  goal: 'goal',
  guideline: 'guideline',
}
