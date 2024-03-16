import React from 'react';
import {MessageTextBody} from "./MessageTextBody";
import MessageHeader from "./MsgHeader";
import {ImSpinner10} from "react-icons/im";
import {TiWarning} from "react-icons/ti";
import {BsCheck2Circle, BsFillInfoCircleFill} from "react-icons/bs";
import {BiSolidMessageSquareError} from "react-icons/bi";
import {TIndicationMessage} from "../types/dataTypes";

interface IIndicationMessageProps extends TIndicationMessage {
  itemId: string; // something like "indication-<uuid>"
}
const MessageIndication: React.FC<IIndicationMessageProps> = ({
  status, created_at, updated_at, text_content, itemId
}) => {
  const bgColorMap = {
    error: "bg-red-50",
    warning: "bg-yellow-50",
    info: "bg-blue-50",
    success: "bg-green-50"
  };
  let indicatorEl = <span>{status}</span>;
  const baseIconStyle = "p-1 rounded-full inline-block ";
  switch (status) {
    case "loading":
      indicatorEl = <span className={baseIconStyle + "bg-white animate-spin"}>
        <ImSpinner10 />
      </span>;
      break;
    case "info":
      indicatorEl = <span className={baseIconStyle + "text-blue-500"}>
        <BsFillInfoCircleFill />
      </span>;
      break;
    case "warning":
      indicatorEl = <span className={baseIconStyle + "text-yellow-500 animate-pulse"}>
        <TiWarning />
      </span>;
      break;
    case "error":
      indicatorEl = <span className={baseIconStyle + "text-red-500 animate-pulse"}>
        <BiSolidMessageSquareError />
      </span>;
      break;
    case "success":
      indicatorEl = <span className={baseIconStyle + "text-green-500"}>
        <BsCheck2Circle />
      </span>;
      break;
  }

  return <div className={`${bgColorMap[status]} p-2 rounded shadow`} data-id="indication-message">
    <MessageHeader
      itemId={itemId}
      createdAt={created_at}
      updatedAt={updated_at ?? created_at}
      itemRole={status}
      itemType="uiIndication"
      isDeletable={false}
      isEditable={false}
    />
    <div className="flex justify-start items-center space-x-2 mt-1">
      {indicatorEl}
      {text_content && <MessageTextBody messageText={text_content}/>}
    </div>
  </div>;
};

export default MessageIndication;
export type {IIndicationMessageProps};
