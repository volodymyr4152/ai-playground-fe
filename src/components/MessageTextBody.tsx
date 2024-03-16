import React, {useMemo} from "react";
import Markdown from "markdown-to-jsx";
import {CodeBlock, CodeHighlighter} from "./CodeHighlighter";
import {CodeBlockContextProvider} from "../contexts/blockCode";

interface IMessageTextBodyProps {
  messageText: string;
}

export const MessageTextBody: React.FC<IMessageTextBodyProps> = ({ messageText }) => {
  const markdownOverrides = useMemo(() => ({
    overrides: {
      code: {component: CodeHighlighter, },
      pre: {component: CodeBlock, },
    }
  }), []);
  // const markdownOverrides = useMemo(() => ({}), []);
  const renderText = useMemo(() => {
    if (!messageText) {
      return null;
    }

    const codeTags = (messageText.match(/```/g) || []).length;
    // Add a closing code tag if there is an odd number of code tags
    return codeTags % 2 === 0 ? messageText : messageText + "```";
  }, [messageText]);
  if (renderText) {
    return <CodeBlockContextProvider value={false}>
      <Markdown options={markdownOverrides}>
        {renderText}
      </Markdown>
    </CodeBlockContextProvider>
  }
}
