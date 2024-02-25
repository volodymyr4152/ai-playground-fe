import axios from "axios";
import {TChatItemMultiType, TChatSpan} from "../types/dataTypes";

export const aipeReqInstance = axios.create({baseURL: 'http://localhost:3000/api/aipe/', timeout: 3000,});

export const addSpanItem = (spanId: string, item: Partial<TChatItemMultiType>) => {
  return aipeReqInstance.post(`spans/${spanId}/chains/`, {"items": [item]});
}


export const createNewSpan = (chatId: string, spanInfo: Partial<TChatSpan>) => {
  return aipeReqInstance.post(`contexts/${chatId}/spans/`, spanInfo);
}
