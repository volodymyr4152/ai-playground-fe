import React, {Fragment, useState} from 'react';
import {useChatQuery, useUpdateChat} from "../hooks/useChatsApi";
import {RiEdit2Line} from "react-icons/ri";

interface ITitleEditorProps {
  chatId: string;
}


const TitleEditor: React.FC<ITitleEditorProps> = ({ chatId }) => {
  const { data: {title} } = useChatQuery(chatId);
  const updateChatMutation = useUpdateChat(chatId);
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
  };

  const saveTitle = () => {
    updateChatMutation.mutate({chatData: {title: newTitle}});
    setIsEditing(false);
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <Fragment>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={saveTitle}>Save</button>
        </Fragment>
      ) : (
        <Fragment>
          <span className="text-2xl bold p-1">{title}</span>
          <button onClick={startEditing} className="p-1 rounded hover:bg-amber-300"><RiEdit2Line /></button>
        </Fragment>
      )}
    </div>
  );
};

export default TitleEditor;
