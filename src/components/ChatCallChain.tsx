import React, {Fragment, useCallback} from 'react';
import MessageItem from "./MessageMultitype";
import {Badge} from "flowbite-react";
import Moment from "react-moment";
import {MdDeleteForever, MdInfoOutline} from "react-icons/md";
import CopyBadge from "./CopyBadge";
import {ModPopover} from "./ModPopover";
import {ChainContextProvider, useSpanContext} from "../contexts/chatContexts";
import {useChainQuery, useDeleteChain, useGenerateToChain} from "../hooks/useChainsApi";
import {RiAiGenerate} from "react-icons/ri";
import {IoReload} from "react-icons/io5";

interface IChatCallChainProps {
  chainId: string;
}

const ChatCallChain: React.FC<IChatCallChainProps> = ({chainId}) => {
  const {spanId} = useSpanContext();
  const deleteChainMutation = useDeleteChain();
  const deleteChain = useCallback(
    () => deleteChainMutation.mutate({spanId, chainId}),
    [chainId, spanId, deleteChainMutation]
  );
  const generateToChainMutation = useGenerateToChain();
  const generateToChain = useCallback(
    () => generateToChainMutation.mutate({chainId}),
    [chainId, generateToChainMutation]
  );

  const {data: chainData, refetch} = useChainQuery(chainId);

  if (!chainId || !chainData) {
    return <div>Loading...</div>;
  }
  return <ChainContextProvider value={{chainId}}>
    <div className="bg-gray-50 p-1 mb-2 rounded shadow" id={`call-chain-${chainId}`}>
      <div className="flex items-center space-x-1">
        <Badge color="purple" size="s">Call Chain: {chainData.title || "no-title"}</Badge>
        <ModPopover
          triggerChild={<MdInfoOutline/>}
          contentChild={<Fragment>
            <CopyBadge color="gray" size="xs" copyContent={chainData.created_at}>
              created:<Moment format="HH:mm YYYY-MM-DD">{chainData.created_at}</Moment>
            </CopyBadge>
            <CopyBadge color="gray" size="xs" copyContent={chainData.updated_at}>
              updated:<Moment format="HH:mm YYYY-MM-DD">{chainData.updated_at}</Moment>
            </CopyBadge>
            <CopyBadge color="gray" size="xs" copyContent={chainId}>id: {chainId}</CopyBadge>
          </Fragment>}
        />
        <div className="hover:bg-green-200 p-1 rounded" onClick={generateToChain}><RiAiGenerate/></div>
        <div className="hover:bg-gray-200 p-1 rounded" onClick={() => refetch()}><IoReload /></div>
        <div className="hover:bg-red-300 p-1 rounded" onClick={deleteChain}><MdDeleteForever/></div>
      </div>
      <div className="border-t pt-2 space-y-1.5">
        {chainData.items.map((item) =>
          <MessageItem key={item.id} itemId={item.id}/>
        )}
      </div>
    </div>
  </ChainContextProvider>;
};

export default ChatCallChain;
