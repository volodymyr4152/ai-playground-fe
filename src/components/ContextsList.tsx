import {TConversationContext} from "../types/contextTypes";

interface ITableOfContextsProps {
  contexts: TConversationContext[]
  onSpanClick?: (spanId: string) => void
  onChainClick?: (chainId: string) => void
}

const TableOfContexts: React.FC<ITableOfContextsProps> = (props) => {
  return <div>
    {props.contexts.map((context) => (
      <div key={context.id} className="border border-gray-200 p-1 pr-0 rounded shadow overflow-x-hidden">
        <span className="overflow-x-hidden text-ellipsis text-nowrap">Context ID: {context.id}</span>
        <div className="ml-1">
          {context.spans.map((span) => (
            <div key={span.id} className="border border-gray-200 p-1 pr-0 rounded shadow hover:bg-gray-100">
              <span >Span {span.title}</span>
              <div className="ml-1">
                {span.call_chains.map((chain) => (
                  <div key={chain.id} className="border border-gray-200 p-1 pr-0 rounded hover:bg-blue-100">
                    {chain.title ? chain.title : 'No Title'}
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

export default TableOfContexts
