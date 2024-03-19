import {Button} from "flowbite-react";
import React, {useCallback} from "react";
import {useSelectedChatInfo} from "../hooks/chatStateHooks";
import {useAddNewSpan, useSpanQuery} from "../hooks/useSpanApi";
import {useAddChainWithItem, useGenerateToChain} from "../hooks/useChainsApi";
import {useChatQuery} from "../hooks/useChatsApi";
import {BsArrowReturnRight, BsCommand, BsShift} from "react-icons/bs";

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
  const templateInputRef = React.useRef<HTMLInputElement>(null);
  const roleSelectorRef = React.useRef<HTMLSelectElement>(null);
  const authorNameRef = React.useRef<HTMLInputElement>(null);

  // const defaultTemplateFunc = "({message}) => `${message}`";
  // eslint-disable-next-line no-template-curly-in-string
  const defaultTemplateFunc = "({message}) => `[Slack] VH: ${JSON.stringify(message)}`";

  const {selectedChatId} = useSelectedChatInfo((state) => ({selectedChatId: state.selectedChatId}));
  const {data: chatData} = useChatQuery(selectedChatId);
  const lastSpanId = chatData?.spans?.[chatData.spans.length - 1]?.id;
  const {data: spanData} = useSpanQuery(lastSpanId);
  const lastChainId = spanData?.call_chains?.[spanData.call_chains.length - 1]?.id;

  const addChatItem = useAddChainWithItem();
  const addNewSpan = useAddNewSpan();
  const generateToChainMutation = useGenerateToChain();

  const handleSubmitGenerate = useCallback(() => {
    return generateToChainMutation.mutate({chainId: lastChainId})
  }, [generateToChainMutation, lastChainId]);

  const handleSubmit = useCallback(() => {
    if (inputRef.current) {
      const templateFuncStr = templateInputRef.current?.value.trim() || defaultTemplateFunc;
      // eslint-disable-next-line no-eval
      const templateFunc = eval(templateFuncStr);
      const messageText = templateFunc({message: inputRef.current.value.trim()});
      addChatItem.mutate({
        spanId: lastSpanId,
        item: {
          item_type: roleSelectorRef.current.value,
          text_content: messageText,
          name: authorNameRef.current?.value.trim() || null
        }
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
    } else if (e.key === "g" && e.metaKey) {
      handleSubmitGenerate();
      e.preventDefault();
    }
  }, [handleSubmit, handleNewSpan, handleSubmitGenerate]);

  return (
    <div className={"flex space-y-2 flex-col flex-grow w-full p-2 bg-blue-50 " + props.className}>
      <div className="flex flex-row space-x-1">
        <select
          name="roleSelector"
          id="roleSelector"
          className="p-1 rounded border border-gray-200"
          ref={roleSelectorRef}
          defaultValue="user"
        >
          <option value="user">User</option>
          <option value="assistant">Assistant</option>
          <option value="system">System</option>
        </select>
        <input
          type="text"
          ref={authorNameRef}
          className="w-48 p-1 rounded border border-gray-200"
        />
        <input
          type="text"
          ref={templateInputRef}
          placeholder={defaultTemplateFunc}
          defaultValue={defaultTemplateFunc}
          className="w-full p-1 rounded border border-gray-200"
        />
      </div>
      <div className="flex space-x-2 flex-row flex-grow w-full items-start">
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
      <div className="flex flex-row text-gray-500 text-xs space-x-5 place-items-center">
        <p className="">
          <span className="mx-1 p-1 pt-0 border border-gray-400 rounded">
            <BsCommand className="inline"/>
          </span>+<span className="mx-1 p-1 pt-0 border border-gray-400 rounded">
            <BsShift className="inline"/>
          </span>+<span className="mx-1 p-1 pt-0 border border-gray-400 rounded">
            <BsArrowReturnRight className="inline"/>
          </span><span className="ml-1">to create new span</span>
        </p>
        <p className="">
          <span className="mx-1 p-1 pt-0 border border-gray-400 rounded">
            <BsCommand className="inline"/>
          </span>+<span className="mx-1 p-1 pt-0 border border-gray-400 rounded">
            <BsArrowReturnRight className="inline"/>
          </span>
          <span className="ml-1">to send message</span>
        </p>
        <p className="">
          <span className="mx-1 p-1 pt-0 border border-gray-400 rounded"><BsCommand className="inline"/></span>+
          <span className="mx-1 p-1 pt-0 border border-gray-400 rounded">G</span>
          <span className="ml-1">to generate new item</span>
        </p>
      </div>
    </div>
  );
}

export default UserInputBox;
