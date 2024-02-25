import React, {useState} from "react";
import axios from "axios";
import Chat from "../components/Chat";
import TableOfContents from "../components/ChatsList";
import UserInputBox from "../components/UserInputBox";
import {ChatCtxProvider } from "../contexts/ChatCtx";
import {useChatListCtx} from "../contexts/ChatListCtx";

const reqInstance = axios.create({baseURL: 'http://localhost:3000/api/aipe/', timeout: 3000,});


function MainChatPage() {
  const {chatList, isLoading} = useChatListCtx();
  const [activeChatId, setActiveChatId] = useState(undefined);
  const firstChatId = chatList?.[0]?.id;
  const selectedChatId = activeChatId || firstChatId;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!chatList) {
    return <div>Failed to load chats</div>;
  }
  return (
    <div className="MainChatPage flex flex-row flex-nowrap flex-auto max-h-screen overflow-y-auto">
      <ChatCtxProvider chatId={selectedChatId}>
        <div className="max-w-80 basis-1/4 max-h-full overflow-y-auto overflow-x-hidden">
          <TableOfContents chats={chatList}/>
        </div>
        <div className="basis-3/4 chat-content max-h-full overflow-y-auto overflow-x-hidden">
          {selectedChatId && <Chat/>}
          <UserInputBox
            onNewSpan={() => console.log('new span!')}
            onSubmit={() => console.log('submit!')}
          />
        </div>
      </ChatCtxProvider>
    </div>
  );
}

export default MainChatPage
