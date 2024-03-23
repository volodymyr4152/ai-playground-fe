import React, {useEffect, useRef, useState} from 'react';
import {TAssistantMessage, TSystemMessage, TToolMessage, TUserMessage} from "../types/dataTypes";
import MessageHeader from "./MessageHeader";
import {MessageTextBody} from "./MessageTextBody";
import {useChainItemContext} from "../contexts/chatContexts";
import {useRenderChainItem, useUpdateChainItem} from "../hooks/useChainItemApi";
import {ImInsertTemplate} from "react-icons/im";
import {MdSave} from "react-icons/md";
import {useUpdateTextTemplate} from "../hooks/useTextTemplateApi";
import {SiRender} from "react-icons/si";

interface IGenericMessageProps {
  itemId: string;
  created_at: string;
  updated_at: string;
  item_role: string;
  name: string;
  text_content: string;
  token_count: number;
  item_type: string;

  text_content_template?: {template_text: string, id: string};
  accentColor?: string;
  dataId?: string;
  children?: React.ReactNode;
}


export const GenericMessageComponent: React.FC<IGenericMessageProps> = ({
  itemId, created_at, updated_at, item_role, name, text_content, token_count, item_type,
  text_content_template, accentColor, dataId, children
}) => {
  const {templateVisible, editMode} = useChainItemContext();
  const prevEditMode = useRef(editMode);
  const [messageDraft, setMessageDraft] = useState<string>(text_content || '');
  const [templateDraft, setTemplateDraft] = useState<string>(text_content_template?.template_text || '');
  const updateChainItemMutation = useUpdateChainItem();
  const renderChainItemMutation = useRenderChainItem();
  const updateTemplateTextMutation = useUpdateTextTemplate();
  const accentColorBg = (accentColor) ? `bg-${accentColor}-50` : 'bg-red-50';

  useEffect(() => {
    if (!editMode && prevEditMode.current !== editMode) {
      prevEditMode.current = editMode;
      updateChainItemMutation.mutate({itemId, item: {text_content: messageDraft}});
    } else if (editMode && prevEditMode.current !== editMode) {
      prevEditMode.current = editMode;
    }
  }, [editMode, messageDraft, updateChainItemMutation, itemId]);
  useEffect(() => {
    setMessageDraft(text_content || '')
    setTemplateDraft(text_content_template?.template_text || '');
  }, [text_content, text_content_template]);

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
    {text_content && <MessageTextBody
      messageText={(editMode) ? messageDraft : text_content}
      onMessageTextChange={setMessageDraft}
    />}
    {children}
    {templateVisible &&
      <div className="bg-white p-2 rounded mt-1 border-2 border-blue-600">
        <div className="space-x-2 flex flex-row items-center">
          <span className="p-1 text-xl">Template</span>
          <span
            className={"hover:bg-yellow-200 active:bg-yellow-400 p-1 rounded inline-block"}
            onClick={() => updateTemplateTextMutation.mutate({
              textTemplateId: text_content_template?.id || '',
              textTemplate: {template_text: templateDraft},
            })}
          >
            <MdSave />
          </span>
          <span
            className={"hover:bg-yellow-200 active:bg-yellow-400 p-1 rounded inline-block"}
            onClick={() => renderChainItemMutation.mutate({itemId})}
          >
            <SiRender />
          </span>
        </div>
        <MessageTextBody messageText={templateDraft} onMessageTextChange={setTemplateDraft}/>
      </div>
    }
  </div>;
};

export type {IGenericMessageProps};
