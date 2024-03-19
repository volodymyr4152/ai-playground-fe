import React, {useMemo} from "react";
import Markdown from "markdown-to-jsx";
import {CodeBlock, CodeHighlighter} from "./CodeHighlighter";
import {CodeBlockContextProvider} from "../contexts/blockCode";
import {MessageBodyEditor} from "./MessageBodyEditor";
import {useChainItemContext} from "../contexts/chatContexts";

interface IMessageTextBodyProps {
  messageText: string;
  isEditable?: boolean;
  onMessageTextChange?: (newText: string) => void;
}

export const MessageTextBody: React.FC<IMessageTextBodyProps> = ({ messageText, onMessageTextChange, isEditable }) => {
  const markdownOverrides = useMemo(() => ({
    overrides: {
      code: {component: CodeHighlighter, },
      pre: {component: CodeBlock, },
    }
  }), []);

  const codeTags = (messageText) ? (messageText.match(/```/g) || []).length : 0;
  const renderText = codeTags % 2 === 0 ? messageText : messageText + "```";

  const isTextEditable = isEditable ?? true;
  const {editMode} = useChainItemContext();

  if (renderText && !(editMode && isTextEditable)) {
    return <CodeBlockContextProvider value={false}>
      <Markdown options={markdownOverrides}>
        {renderText}
      </Markdown>
    </CodeBlockContextProvider>
  } else if (renderText && editMode && isTextEditable) {
    return <MessageBodyEditor messageText={renderText} onMessageTextChange={onMessageTextChange}/>
  }
}
