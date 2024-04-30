import React, { useState } from 'react';
import { RiEdit2Line, RiSave2Line, RiCloseLine, RiDeleteBinLine } from 'react-icons/ri';
import {useDeleteVar, useUpdateVar} from "../hooks/useContextVarsApi";
import {useChatContext} from "../contexts/chatContexts";

const VariableItem = ({ value, name, varId }) => {
  const {chatId} = useChatContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [editedName, setEditedName] = useState(name);

  const saveVarMutation = useUpdateVar();
  const deleteVarMutation = useDeleteVar();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    saveVarMutation.mutate({varId, varData: {name: editedName, value: editedValue}});
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteVarMutation.mutate({varId, chatId: chatId});
  };

  return (
    <div className="flex items-center border-b border-gray-200 py-2 mr-5">
      <div className="flex-1">
        {isEditing ? (
          <div className="flex space-x-1 items-center">
            <span className="pl-1">name</span>
            <input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-0.5 w-20"
            />
            <span className="pl-1">value</span>
            <input
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className="border border-gray-300 rounded px-2 py-0.5 w-28"
            />
          </div>
        ) : (
          <div className="space-x-1">
            <span role="img"><code>{name}</code></span>
            <span role="img"><code>{value}</code></span>
          </div>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <button onClick={handleSave} className="text-gray-600 hover:text-gray-800 p-1">
              <RiSave2Line />
            </button>
            <button onClick={() => setIsEditing(false)} className="text-gray-600 hover:text-gray-800 p-1">
              <RiCloseLine />
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="text-gray-600 hover:text-gray-800 p-1">
              <RiEdit2Line />
            </button>
            <button onClick={handleDelete} className="text-gray-600 hover:text-gray-800 p-1">
              <RiDeleteBinLine />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VariableItem;
