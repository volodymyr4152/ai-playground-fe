import {TChat} from "../types/dataTypes";

interface ITableOfContentsProps {
  chats: TChat[]
}

const TableOfContents: React.FC<ITableOfContentsProps> = (props) => {
  if (!props.chats) {
    return <div>Waiting for data</div>
  }

  return <div>
    {props.chats.map((chat) => (
      <div key={chat.id} className="border border-gray-200 p-1 pr-0 rounded shadow overflow-x-hidden">
        <span className="overflow-x-hidden text-ellipsis text-nowrap">ID: {chat.id}</span>
        <div className="ml-1">
          {chat.spans.map((span) => (
            <div
              key={span.id}
              className="border border-gray-200 p-1 pr-0 rounded shadow hover:bg-gray-100"
            >
              <a href={`#chat-span-${span.id}`} className="w-full h-full inline-block">
                <span>Span {span.title}</span>
              </a>
              <div className="ml-1">
                {span.call_chains.map((chain) => (
                  <div
                    key={chain.id}
                    className="border border-gray-200 p-1 pr-0 rounded hover:bg-blue-100"
                  >
                    <a href={`#call-chain-${chain.id}`} className="w-full h-full inline-block">
                      <span>{chain.title ? chain.title : 'No Title'}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}

  </div>
}

export default TableOfContents
