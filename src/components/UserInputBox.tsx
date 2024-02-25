import { Button } from "flowbite-react";
import React from "react";
import {useChatCtx} from "../contexts/ChatCtx";

interface IUserInputBoxProps {
  placeholder?: string;
  submitButtonText?: string;
  newSpanButtonText?: string;
}

const UserInputBox: React.FC<IUserInputBoxProps> = ({submitButtonText, newSpanButtonText, placeholder}) => {
  const submitBtnTxt = submitButtonText || "Send";
  const newSpanBtnTxt = newSpanButtonText || "New Span";
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const { addChatItem, addNewSpan } = useChatCtx();

  const handleSubmit = () => {
    if (inputRef.current) {
      addChatItem({
        item_type: "user",
        text_content: inputRef.current.value
      });
      inputRef.current.value = "";
    }
  }

  const handleNewSpan = () => {
    addNewSpan({title: inputRef.current.value});
    inputRef.current.value = "";
  }

  return (
    <div className="flex space-x-2 flex-row flex-grow w-full p-2 mt-1 mb-1 items-start">
      <textarea className="flex-auto h-full" placeholder={placeholder} ref={inputRef} rows={3}/>
      <div className="flex space-y-1 flex-col items-stretch h-full">
        <Button gradientDuoTone="purpleToBlue" pill onClick={handleSubmit}>{submitBtnTxt}</Button>
        <Button gradientDuoTone="redToYellow" pill onClick={handleNewSpan}>{newSpanBtnTxt}</Button>
      </div>
    </div>
  );
}

export default UserInputBox;
