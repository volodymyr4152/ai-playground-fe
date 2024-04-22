import {Button} from "flowbite-react";
import React, {useCallback} from "react";
import {useSelectedChatInfo, useUserInputState} from "../hooks/chatStateHooks";
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
  const {
    selectedRole,
    setSelectedRole,
    currentContent,
    setCurrentContent,
    userName,
    setUserName,
    formattingCode,
    setFormattingCode,
  } = useUserInputState();

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
    if (currentContent.trim()) {
      const templateFuncStr = formattingCode.trim() || defaultTemplateFunc;
      // eslint-disable-next-line no-eval
      const templateFunc = eval(templateFuncStr);
      const messageText = templateFunc({message: currentContent.trim()});
      addChatItem.mutate({
        spanId: lastSpanId,
        item: {
          item_type: selectedRole,
          text_content: messageText,
          name: userName.trim() || null
        }
      });
    }
    setCurrentContent("");
    inputRef.current.focus();
  }, [currentContent, setCurrentContent, formattingCode, addChatItem, lastSpanId, selectedRole, userName]);

  const handleNewSpan = useCallback(() => {
    if (currentContent.trim()) {
      addNewSpan.mutate({
        chatId: selectedChatId,
        spanInfo: {title: currentContent.trim()}
      });
    }
    setCurrentContent("");
    inputRef.current.focus();
  }, [currentContent, setCurrentContent, addNewSpan, selectedChatId]);

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
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="assistant">Assistant</option>
          <option value="system">System</option>
        </select>
        <input
          type="text"
          placeholder="Author Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-48 p-1 rounded border border-gray-200"
        />
        <input
          type="text"
          placeholder={defaultTemplateFunc}
          value={formattingCode}
          onChange={(e) => setFormattingCode(e.target.value)}
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
          onChange={(e) => setCurrentContent(e.target.value)}
          value={currentContent}
        />
        <div className="flex space-y-1 flex-col items-stretch h-full">
          <Button gradientDuoTone="purpleToBlue" pill onClick={handleSubmit}>{submitBtnTxt}</Button>
          <Button gradientDuoTone="redToYellow" pill onClick={handleNewSpan}>{newSpanBtnTxt}</Button>
        </div>
      </div>
      <div className="flex flex-row text-gray-500 text-xs space-x-5 place-items-center">
        <p className="">
          <span className="mx-1 p-1 pt-0 border border-gray-400 rounded"><BsCommand className="inline"/></span>+
          <span className="mx-1 p-1 pt-0 border border-gray-400 rounded">G</span>
          <span className="ml-1">to generate new item</span>
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
          <span className="mx-1 p-1 pt-0 border border-gray-400 rounded">
            <BsCommand className="inline"/>
          </span>+<span className="mx-1 p-1 pt-0 border border-gray-400 rounded">
            <BsShift className="inline"/>
          </span>+<span className="mx-1 p-1 pt-0 border border-gray-400 rounded">
            <BsArrowReturnRight className="inline"/>
          </span><span className="ml-1">to create new span</span>
        </p>
      </div>
    </div>
  );
}

export default UserInputBox;
