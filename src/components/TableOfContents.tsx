import {Accordion, Button} from "flowbite-react";
import {useSelectedChatInfo} from "../hooks/chatStateHooks";
import {useCallback} from "react";
import {useAddNewChat, useChatListQuery, useChatQuery} from "../hooks/useChatsApi";
import {MdRefresh} from "react-icons/md";
import {useSpanQuery} from "../hooks/useSpanApi";
import {ChatContextProvider, useChatContext} from "../contexts/chatContexts";

interface ITableOfContentsProps {}


const TableOfContentsSpan = ({spanId}: {spanId: string}) => {
  const {chatId} = useChatContext();
  const {data: span} = useSpanQuery(spanId);
  const {setSelectedChatId} = useSelectedChatInfo((state) => ({setSelectedChatId: state.setSelectedChatId}));

  if (!span) {
    return <div>Loading...</div>
  }

  return <Accordion
    key={span.id}
    className="border border-gray-200 p-1 pr-0 rounded shadow hover:bg-gray-100"
    collapseAll
  >
    <Accordion.Panel>
      <Accordion.Title className="m-0 p-1 text-ellipsis overflow-x-hidden overflow-y-hidden">
        <a href={`#chat-span-${span.id}`} onClick={() => setSelectedChatId(chatId)}>
          {span.title || "no-span-title"}
        </a>
      </Accordion.Title>
      <Accordion.Content className="ml-1 p-2 pr-0 pl-0">
        {span.call_chains.map((chain) => (
          <a
            key={chain.id}
            href={`#call-chain-${chain.id}`}
            className="block border border-gray-200 p-1 pr-0 rounded hover:bg-blue-100"
            onClick={() => setSelectedChatId(chatId)}
          >
            {chain.title ? chain.title : 'No Title'}
          </a>
        ))}
      </Accordion.Content>
    </Accordion.Panel>
  </Accordion>
}


const TableOfContentsChat = ({chatId}: {chatId: string}) => {
  const {data: chat} = useChatQuery(chatId);
  const {selectedChatId, setSelectedChatId} = useSelectedChatInfo();

  const chatPanelClsBase = "border m-1 pr-0 rounded shadow bg-white"
  const chatPanelCls = chatPanelClsBase + (chatId === selectedChatId ? " border-blue-600" : " border-blue-100");

  const chatHeaderClsBase = "m-0 p-2 text-ellipsis overflow-x-hidden overflow-hidden";
  const chatHeaderCls = chatHeaderClsBase + (chatId === selectedChatId ? " bg-green-100" : "");

  if (!chat) {
    return <div>Loading...</div>
  }

  return <ChatContextProvider value={{chatId}}>
    <Accordion key={chat.id} className={chatPanelCls}>
      <Accordion.Panel>
        <Accordion.Title
          className={chatHeaderCls}
          onClick={() => setSelectedChatId(chat.id)}
        >
          <span className="overflow-hidden text-ellipsis inline-block max-w-64">ID:&nbsp;{chat.id}</span>
        </Accordion.Title>
        <Accordion.Content className="m-0 p-0">
          {chat.spans.map((span) => <TableOfContentsSpan key={span.id} spanId={span.id}/>)}
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  </ChatContextProvider>
}


const TableOfContents: React.FC<ITableOfContentsProps> = (props) => {
  const {data: chatList, refetch} = useChatListQuery();
  const addChatMutation = useAddNewChat();
  const createChat = useCallback(() => addChatMutation.mutate({}), [addChatMutation]);
  const refetchChatList = useCallback(() => refetch(), [refetch]);

  if (!chatList) {
    return <div>Waiting for data</div>
  }

  return <div className="w-full flex flex-col pr-2 pl-1 pt-4 justify-stretch bg-blue-50 h-full">
    <div className="w-full flex flex-row items-stretch">
      <Button className="justify-stretch p-0 ml-1 grow" onClick={createChat}>
        New Chat
      </Button>
      <Button className="p-0 ml-1 grow-0" color="gray" onClick={refetchChatList}>
        <MdRefresh/>
      </Button>
    </div>
    {chatList.map((chat) => <TableOfContentsChat key={chat.id} chatId={chat.id}/>)}
  </div>
}

export default TableOfContents
