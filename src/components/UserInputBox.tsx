import { Button } from "flowbite-react";
import React from "react";

interface IUserInputBoxProps {
  onSubmit: (text: string) => void;
  onNewSpan: () => void;
  placeholder?: string;
  submitButtonText?: string;
  newSpanButtonText?: string;
}

const UserInputBox: React.FC<IUserInputBoxProps> = (props) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const submitButtonText = props.submitButtonText || "Send";
  const newSpanButtonText = props.newSpanButtonText || "New Span";

  const handleOnSubmit = () => {
    if (inputRef.current) {
      props.onSubmit(inputRef.current.value);
      inputRef.current.value = "";
    }
  }

  return (
    <div className="flex space-x-2 flex-row flex-grow w-full p-2 mt-1 mb-1 items-start">
      <textarea className="flex-auto h-full" placeholder={props.placeholder} ref={inputRef} rows={3}/>
      <div className="flex space-y-1 flex-col items-stretch h-full">
        <Button gradientDuoTone="purpleToBlue" pill onClick={handleOnSubmit}>{submitButtonText}</Button>
        <Button gradientDuoTone="redToYellow" pill onClick={props.onNewSpan}>{newSpanButtonText}</Button>
      </div>
    </div>
  );
}

export default UserInputBox;
