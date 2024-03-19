import React, {useEffect, useRef, useState} from 'react';
import {TSystemMessage} from "../types/dataTypes";
import MessageHeader from "./MsgHeader";
import {MessageTextBody} from "./MessageTextBody";
import {useChainItemContext} from "../contexts/chatContexts";
import {useUpdateChainItem} from "../hooks/useChainItemApi";

interface ISystemMessageProps extends TSystemMessage {
  itemId: string;
}


const MessageSystem: React.FC<ISystemMessageProps> = ({
  itemId, created_at, updated_at, item_role, name, text_content, token_count, item_type, text_content_template
}) => {
  const {templateVisible, editMode} = useChainItemContext();
  const prevEditMode = useRef(editMode);
  const [messageDraft, setMessageDraft] = useState<string>(text_content || '');
  const updateChainItemMutation = useUpdateChainItem();

  useEffect(() => {
    console.log('MessageSystem: useEffect: editMode:', editMode, 'prevEditMode:', prevEditMode.current);
    if (!editMode && prevEditMode.current !== editMode) {
      prevEditMode.current = editMode;
      updateChainItemMutation.mutate({itemId, item: {text_content: messageDraft}});
    } else if (editMode && prevEditMode.current !== editMode) {
      prevEditMode.current = editMode;
    }
  }, [editMode, messageDraft, updateChainItemMutation, itemId]);

  return <div className="bg-purple-50 p-2 rounded shadow" data-id="system-message">
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
    {templateVisible &&
      <div>
        <p className="text-xl">Template</p>
        <MessageTextBody messageText={text_content_template?.template_text}/>
      </div>
    }
  </div>;
};

export default MessageSystem;
export type {ISystemMessageProps};
