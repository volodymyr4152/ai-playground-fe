import React from "react";
import Chat from "../components/Chat";
import TableOfContents from "../components/TableOfContents";
import UserInputBox from "../components/UserInputBox";
import {ChatCtxProvider } from "../contexts/ChatCtx";
import {useChatListCtx} from "../contexts/ChatListCtx";


function MainChatPage() {
  const {chatList, isLoading, selectedChatId, isFetching} = useChatListCtx();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!chatList) {
    return <div>Failed to load chats</div>;
  }
  return (
    <ChatCtxProvider chatId={selectedChatId} pauseFetching={isFetching}>
      <div className="MainChatPage flex flex-row flex-nowrap flex-auto max-h-screen overflow-y-auto h-screen">
        <div className="max-w-80 basis-1/4 max-h-full overflow-y-auto overflow-x-hidden">
          <TableOfContents/>
        </div>
        <div className="
          basis-3/4 chat-content max-h-full flex-grow overflow-y-auto overflow-x-hidden
          flex flex-col flex-nowrap justify-between
        ">
          <Chat className="max-h-fit overflow-y-scroll"/>
          <UserInputBox className="min-h-[100px] max-h-48"/>
        </div>
      </div>
    </ChatCtxProvider>
  );
}

export default MainChatPage
