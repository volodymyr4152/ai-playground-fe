import React, {useEffect} from "react";
import Chat from "../components/Chat";
import TableOfContents from "../components/TableOfContents";
import UserInputBox from "../components/UserInputBox";
import {useSelectedChatInfo} from "../hooks/chatStateHooks";
import {useChatListQuery} from "../hooks/useChatsApi";
import {ChatContextProvider} from "../contexts/chatContexts";



function MainChatPage() {
  const {data: chatList} = useChatListQuery();
  const {selectedChatId, setSelectedChatId} = useSelectedChatInfo();
  const selectedChatIdPresent = chatList?.map(chat => chat.id).includes(selectedChatId);
  const firstChatId = chatList?.[0]?.id;

  useEffect(() => {
    if (
      (selectedChatId && selectedChatIdPresent)
      || !firstChatId
      || firstChatId === selectedChatId
    ) { return; }
    setSelectedChatId(firstChatId);
  }, [firstChatId, selectedChatId, selectedChatIdPresent, setSelectedChatId]);

  if (!chatList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MainChatPage flex flex-row flex-nowrap flex-auto max-h-screen overflow-y-auto h-screen">
      <div className="max-w-80 basis-1/4 max-h-full overflow-y-auto overflow-x-hidden">
        <TableOfContents/>
      </div>
      <div className="
        basis-3/4 chat-content max-h-full flex-grow overflow-y-auto overflow-x-hidden
        flex flex-col flex-nowrap justify-between
      ">
        <ChatContextProvider value={{chatId: selectedChatId}}>
          <Chat className="max-h-fit overflow-y-scroll" chatId={selectedChatId}/>
          <UserInputBox className="min-h-[175px] max-h-64" chatId={selectedChatId}/>
        </ChatContextProvider>
      </div>
    </div>
  );
}

export default MainChatPage
