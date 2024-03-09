import React, {useEffect} from "react";
import Chat from "../components/Chat";
import TableOfContents from "../components/TableOfContents";
import UserInputBox from "../components/UserInputBox";
import {useSelectedChatInfo} from "../hooks/chatStateHooks";
import {useChatListQuery} from "../hooks/useChatsApi";



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
        <Chat className="max-h-fit overflow-y-scroll" chatId={selectedChatId}/>
        <UserInputBox className="min-h-[100px] max-h-48" chatId={selectedChatId}/>
      </div>
    </div>
  );
}

export default MainChatPage
