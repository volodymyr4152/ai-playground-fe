import {Button} from "flowbite-react";
import React, {useCallback} from "react";
import {useSelectedChatInfo} from "../hooks/chatStateHooks";
import {useAddNewSpan} from "../hooks/useSpanApi";
import {useAddChainWithItem} from "../hooks/useChainsApi";
import {useChatQuery} from "../hooks/useChatsApi";

interface IUserInputBoxProps {
  chatId: string;
  placeholder?: string;
  submitButtonText?: string;
  newSpanButtonText?: string;
  className?: string;
}

const UserInputBox: React.FC<IUserInputBoxProps> = (props) => {
  const submitBtnTxt = props.submitButtonText ?? "Send";
  const newSpanBtnTxt = props.newSpanButtonText ?? "New Span";
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const {selectedChatId} = useSelectedChatInfo((state) => ({selectedChatId: state.selectedChatId}));
  const {data: chatData} = useChatQuery(selectedChatId);
  const lastSpanId = chatData?.spans?.[chatData.spans.length - 1]?.id;

  const addChatItem = useAddChainWithItem();
  const addNewSpan = useAddNewSpan();

  const handleSubmit = useCallback(() => {
    if (inputRef.current) {
      addChatItem.mutate({
        spanId: lastSpanId,
        item: {item_type: "user", text_content: inputRef.current.value.trim()}
      });
    }
    inputRef.current.value = "";
    inputRef.current.focus();
  }, [lastSpanId, addChatItem]);

  const handleNewSpan = useCallback(() => {
    if (inputRef.current) {
      addNewSpan.mutate({
        chatId: selectedChatId,
        spanInfo: {title: inputRef.current.value.trim()}
      });
    }
    inputRef.current.value = "";
    inputRef.current.focus();
  }, [selectedChatId, addNewSpan]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.metaKey && e.shiftKey) {
      handleNewSpan();
    } else if (e.key === "Enter" && e.metaKey) {
      handleSubmit();
    }
  }, [handleSubmit, handleNewSpan]);

  return (
    <div className={"flex space-x-2 flex-row flex-grow w-full p-2 items-start bg-blue-50 " + props.className}>
      <textarea
        className="flex-auto h-full"
        placeholder={props.placeholder}
        ref={inputRef}
        rows={3}
        onKeyDown={handleKeyDown}
      />
      <div className="flex space-y-1 flex-col items-stretch h-full">
        <Button gradientDuoTone="purpleToBlue" pill onClick={handleSubmit}>{submitBtnTxt}</Button>
        <Button gradientDuoTone="redToYellow" pill onClick={handleNewSpan}>{newSpanBtnTxt}</Button>
      </div>
    </div>
  );
}

export default UserInputBox;
