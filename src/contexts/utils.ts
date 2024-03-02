import axios from "axios";
import {TChatItemMultiType} from "../types/dataTypes";

export const aipeReqInstance = axios.create({baseURL: 'http://localhost:3000/api/aipe/', timeout: 3000,});

export const createSpanChainWithItem = (spanId: string, item: Partial<TChatItemMultiType>) => {
  return aipeReqInstance.post(`spans/${spanId}/chains/`, {"items": [item]});
}
