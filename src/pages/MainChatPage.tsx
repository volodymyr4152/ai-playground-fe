import React, {useState} from "react";
import axios from "axios";
import ConversationContext from "../components/ConversationContext";
import TableOfContexts from "../components/ContextsList";
import {TConversationContext} from "../types/contextTypes";

const reqInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 3000,
});


function MainChatPage() {
  const [contexts, setContexts] = useState([]);
  const [activeContextId, setActiveContext] = useState('');
  const activeContext = contexts.filter((context: TConversationContext) => context.id === activeContextId)[0];

  if (Object.keys(contexts).length === 0) {
    reqInstance.get(
      'aipe/context/'
    ).then((response) => {
      console.log(response.data);
      setContexts(response.data as TConversationContext[]);
      if (activeContextId === '' && response.data.length > 0) {
        setActiveContext(response.data[0].id);
      }
    });
  }

  // @ts-ignore
  return (
    <div className="MainChatPage flex flex-row flex-nowrap flex-auto max-h-screen overflow-y-auto">
      <div className="max-w-80 basis-1/4 max-h-full overflow-y-auto overflow-x-hidden">
        <TableOfContexts contexts={contexts}/>
      </div>
      <div className="basis-3/4 flex-grow chat-content max-h-full overflow-y-auto overflow-x-hidden">
        {activeContext && <ConversationContext conversationContext={activeContext}/>}
      </div>
    </div>
  );
}

export default MainChatPage
