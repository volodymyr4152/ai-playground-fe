import React, {useRef, useState} from 'react';
import { RiEdit2Line, RiSave2Line, RiCloseLine, RiDeleteBinLine } from 'react-icons/ri';
import {useContextVar, useDeleteVar, useUpdateVar} from "../hooks/useContextVarsApi";
import {useChatContext} from "../contexts/chatContexts";

interface IVariableItemProps {
  varId: string;
}

const VariableItem: React.FC<IVariableItemProps> = ({ varId }) => {
  const {chatId} = useChatContext();
  const {data: varData} = useContextVar(varId)
  const [isEditing, setIsEditing] = useState(false);
  const nameInput = useRef<HTMLInputElement>(null);
  const valueInput = useRef<HTMLInputElement>(null);

  const saveVarMutation = useUpdateVar();
  const deleteVarMutation = useDeleteVar();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    saveVarMutation.mutate({varId, varData: {name: nameInput.current.value, value: valueInput.current.value}});
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteVarMutation.mutate({varId, chatId: chatId});
  };

  return (
    <div className="flex items-center border-b border-gray-200 py-2 mr-5">
      <div className="flex-1">
        {isEditing ? (
          <div className="flex space-x-1 items-center font-mono">
            <span className="pl-1">name</span>
            <input
              ref={nameInput}
              defaultValue={varData?.name}
              className="border border-b-2 border-blue-400 rounded px-2 py-0.5 w-1/3"
            />
            <span className="pl-1">value</span>
            <input
              ref={valueInput}
              defaultValue={varData?.value}
              className="border border-b-2 border-blue-400 rounded px-2 py-0.5 w-2/3"
            />
          </div>
        ) : (
          <div className="space-x-1">
            <span className="bg-amber-100 p-0.5 rounded font-mono">{varData.name}</span>
            <span className="rounded font-mono">{varData.value}</span>
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
