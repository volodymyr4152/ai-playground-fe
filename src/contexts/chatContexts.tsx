import {createContext, ReactNode, useContext, useMemo, useState} from "react";


interface IChatContext {
  chatId: string
}
export const ChatContext = createContext<IChatContext>(undefined);
export const ChatContextProvider = ChatContext.Provider;
export const useChatContext = () => useContext<IChatContext>(ChatContext);


interface ISpanContext {
  spanId: string
}
export const SpanContext = createContext<ISpanContext>(undefined);
export const SpanContextProvider = SpanContext.Provider;
export const useSpanContext = () => useContext<ISpanContext>(SpanContext);


interface IChainContext {
  chainId: string
}
export const ChainContext = createContext<IChainContext>(undefined);
export const ChainContextProvider = ChainContext.Provider;
export const useChainContext = () => useContext<IChainContext>(ChainContext);


interface IChainItemContext {
  itemId: string,
  templateVisible: boolean,
  setTemplateVisible: (newTemplateVisible: boolean) => void
  editMode: boolean,
  setEditMode: (newEditMode: boolean) => void
}
interface IChainItemContextProviderProps {
  children: ReactNode
  value: {
    itemId: string
  }
}
export const ChainItemContext = createContext<IChainItemContext>(undefined);
export const ChainItemContextProvider: React.FC<IChainItemContextProviderProps> = ({value, children}) => {
  const [templateVisible, setTemplateVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const computedValue = useMemo(() => ({
    itemId: value.itemId,
    templateVisible,
    setTemplateVisible,
    editMode,
    setEditMode
  }), [value.itemId, templateVisible, setTemplateVisible, editMode, setEditMode]);
  return <ChainItemContext.Provider value={computedValue}>
    {children}
  </ChainItemContext.Provider>;
}
export const useChainItemContext = () => useContext<IChainItemContext>(ChainItemContext);
