import React, {useEffect, useRef, useState} from 'react';
import {TAssistantMessage, TSystemMessage, TToolMessage, TUserMessage} from "../types/dataTypes";
import MessageHeader from "./MsgHeader";
import {MessageTextBody} from "./MessageTextBody";
import {useChainItemContext} from "../contexts/chatContexts";
import {useUpdateChainItem} from "../hooks/useChainItemApi";

interface IGenericMessageProps {
  itemId: string;
  created_at: string;
  updated_at: string;
  item_role: string;
  name: string;
  text_content: string;
  token_count: number;
  item_type: string;

  text_content_template?: {template_text: string};
  accentColor?: string;
  dataId?: string;
  children?: React.ReactNode;
}


export const GenericMessageComponent: React.FC<IGenericMessageProps> = ({
  itemId, created_at, updated_at, item_role, name, text_content, token_count, item_type, text_content_template,
  accentColor, dataId, children
}) => {
  const {templateVisible, editMode} = useChainItemContext();
  const prevEditMode = useRef(editMode);
  const [messageDraft, setMessageDraft] = useState<string>(text_content || '');
  const updateChainItemMutation = useUpdateChainItem();
  const accentColorBg = (accentColor) ? `bg-${accentColor}-50` : 'bg-red-50';

  useEffect(() => {
    if (!editMode && prevEditMode.current !== editMode) {
      prevEditMode.current = editMode;
      updateChainItemMutation.mutate({itemId, item: {text_content: messageDraft}});
    } else if (editMode && prevEditMode.current !== editMode) {
      prevEditMode.current = editMode;
    }
  }, [editMode, messageDraft, updateChainItemMutation, itemId]);

  return <div className={accentColorBg + " p-2 rounded shadow"} data-id={(dataId) ? dataId : 'generic-message'}>
    <MessageHeader
      itemId={itemId}
      createdAt={created_at}
      updatedAt={updated_at}
      itemRole={item_role}
      itemType={item_type}
      authorName={name}
      tokenCount={token_count}

    />
    {text_content && <MessageTextBody messageText={messageDraft} onMessageTextChange={setMessageDraft}/>}
    {children}
    {templateVisible &&
      <div className="bg-white p-2 rounded">
        <p className="text-xl">Template</p>
        <MessageTextBody messageText={text_content_template?.template_text}/>
      </div>
    }
  </div>;
};

export type {IGenericMessageProps};
