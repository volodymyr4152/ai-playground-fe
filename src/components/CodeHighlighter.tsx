import {codeToHtml} from "shiki";
import {useEffect, useState} from "react";
import {CodeBlockContextProvider, useCodeBlockContext} from "../contexts/blockCode";
import {shikijsHighlighterTheme} from "../utils";

interface ICodeHighlighterProps {
  children: string;
  className?: string;
  forcedLanguage?: string;
  forcedBlock?: boolean
}

export const CodeBlock: React.FC<{children: string, className?: string}> = ({children, className}) => {
  return <CodeBlockContextProvider value={true}>
    <pre className={className}>{children}</pre>
  </CodeBlockContextProvider>
}


export const CodeHighlighter: React.FC<ICodeHighlighterProps> = ({ children, className, forcedLanguage, forcedBlock}) => {
  const [highlightedCode, setHighlightedCode] = useState('');
  const isBlock = useCodeBlockContext();
  let language = forcedLanguage || className?.toLowerCase().replace('lang-', '') || '';
  if (!['js', 'javascript', 'python', 'md', 'markdown'].includes(language)) {
    console.error(`Invalid language: ${language}`);
    language = 'plaintext';
  }

  useEffect(() => {
    if (isBlock || forcedBlock) {
      codeToHtml(children, {lang: language, theme: shikijsHighlighterTheme}).then((html) => setHighlightedCode(html))
    } else {
      setHighlightedCode(`<code data-test-id="formatted-inline-code">${children}</code>`);
    }
  }, [language, isBlock, forcedBlock, children]);

  if (isBlock) {
    return <p
      className={"*:p-3 *:rounded *:overflow-x-scroll w-full " + className}
      dangerouslySetInnerHTML={{__html: highlightedCode}}
    />;
  } else {
    return <span
      className={"inline-block p-0.5 bg-blue-100 rounded border border-gray-200 " + className}
      dangerouslySetInnerHTML={{__html: highlightedCode}}
    />;
  }
}

