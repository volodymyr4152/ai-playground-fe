import {Accordion, Button} from "flowbite-react";
import {useChatListCtx} from "../contexts/ChatListCtx";

interface ITableOfContentsProps {}

const TableOfContents: React.FC<ITableOfContentsProps> = (props) => {
  const {chatList, isLoading, selectedChatId, createChat, setSelectedChatId} = useChatListCtx();
  if (!chatList || isLoading) {
    return <div>Waiting for data</div>
  }

  const getChatClassNames = (chatId: string) => {
    if (chatId === selectedChatId) {
      return "border m-1 pr-0 rounded shadow bg-white border-blue-600"
    } else {
      return "border m-1 pr-0 rounded shadow bg-white border-blue-100"
    }
  }

  return <div className="w-full flex flex-col pr-2 pl-1 pt-4 justify-stretch bg-blue-50 h-full">
    <Button className="justify-stretch p-0 mr-1 ml-1" onClick={createChat}>
      New Chat
    </Button>
    {chatList.map((chat) => (
      <Accordion key={chat.id} className={getChatClassNames(chat.id)}>
        <Accordion.Panel>
          <Accordion.Title
            className="m-0 p-2 text-ellipsis overflow-x-hidden overflow-hidden"
            onClick={() => setSelectedChatId(chat.id)}
          >
            <span className="overflow-hidden text-ellipsis inline-block max-w-64">ID:&nbsp;{chat.id}</span>
          </Accordion.Title>
          <Accordion.Content className="m-0 p-0">
            {chat.spans.map((span) => (
              <Accordion
                key={span.id}
                className="border border-gray-200 p-1 pr-0 rounded shadow hover:bg-gray-100"
                collapseAll
              >
                <Accordion.Panel>
                  <Accordion.Title className="m-0 p-1 text-ellipsis overflow-x-hidden overflow-y-hidden">
                    <a href={`#chat-span-${span.id}`}>Span&nbsp;{span.title}</a>
                  </Accordion.Title>
                  <Accordion.Content className="ml-1 p-2 pr-0 pl-0">
                    {span.call_chains.map((chain) => (
                      <a
                        key={chain.id}
                        href={`#call-chain-${chain.id}`}
                        className="block border border-gray-200 p-1 pr-0 rounded hover:bg-blue-100"
                      >
                        {chain.title ? chain.title : 'No Title'}
                      </a>
                    ))}
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            ))}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    ))}

  </div>
}

export default TableOfContents
