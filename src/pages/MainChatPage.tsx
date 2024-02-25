import React, {useState} from "react";
import axios from "axios";
import Chat from "../components/Chat";
import TableOfContexts from "../components/ChatsList";
import {TChat} from "../types/contextTypes";
import UserInputBox from "../components/UserInputBox";
import {useQuery} from "react-query";

const reqInstance = axios.create({baseURL: 'http://localhost:3000/api/aipe/', timeout: 3000,});


function MainChatPage() {
  const { data: contexts, isLoading: isContextsLoading } = useQuery({
    queryKey: 'contexts',
    queryFn: (): Promise<TChat[]> => reqInstance.get('contexts/').then((res) => res.data),
  });
  const [activeContextId, setActiveContextId] = useState(undefined);
  const firstContextId = contexts?.[0]?.id;
  const selectedContextId = activeContextId || firstContextId;
  const selectedContext = contexts?.filter((context: TChat) => context.id === selectedContextId)?.[0];

  return (
    <div className="MainChatPage flex flex-row flex-nowrap flex-auto max-h-screen overflow-y-auto">
      <div className="max-w-80 basis-1/4 max-h-full overflow-y-auto overflow-x-hidden">
        <TableOfContexts contexts={contexts}/>
      </div>
      <div className="basis-3/4 chat-content max-h-full overflow-y-auto overflow-x-hidden">
        {selectedContextId && <Chat chat={selectedContext}/>}
        <UserInputBox
          onNewSpan={() => console.log('new span!')}
          onSubmit={() => console.log('submit!')}
        />
      </div>
    </div>
  );
}

export default MainChatPage
