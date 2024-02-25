import React, {useState} from "react";
import axios from "axios";
import Chat from "../components/Chat";
import TableOfContents from "../components/ChatsList";
import {TChat} from "../types/dataTypes";
import UserInputBox from "../components/UserInputBox";
import {useQuery} from "react-query";
import {ChatCtxProvider, setChatNestedData} from "../contexts/ChatCtx";
import {queryClient} from "../App";

const reqInstance = axios.create({baseURL: 'http://localhost:3000/api/aipe/', timeout: 3000,});


function MainChatPage() {
  const { data: chats, isLoading: isChatsLoading } = useQuery({
    queryKey: 'chats',
    queryFn: (): Promise<TChat[]> => reqInstance.get('contexts/').then((res) => res.data),
    onSuccess: (chats: TChat[]) => {
      chats.forEach((chat) => {
        queryClient.setQueryData(['chat', chat.id], chat);
        setChatNestedData(chat);
      })
    }
  });
  const [activeChatId, setActiveChatId] = useState(undefined);
  const firstChatId = chats?.[0]?.id;
  const selectedChatId = activeChatId || firstChatId;

  return (
    <div className="MainChatPage flex flex-row flex-nowrap flex-auto max-h-screen overflow-y-auto">
      <ChatCtxProvider chatId={selectedChatId}>
        <div className="max-w-80 basis-1/4 max-h-full overflow-y-auto overflow-x-hidden">
          <TableOfContents chats={chats}/>
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
