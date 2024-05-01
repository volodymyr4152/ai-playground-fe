import React, { useState } from 'react';
import {RiAddCircleLine} from 'react-icons/ri';
import {useAddNewVar} from "../hooks/useContextVarsApi";
import {useChatContext} from "../contexts/chatContexts";

const VariableAdd = () => {
  const {chatId} = useChatContext();
  const [value, setValue] = useState('');
  const [name, setName] = useState('');

  const addVarMutation = useAddNewVar();

  const handleAdd = () => {
    addVarMutation.mutate({varData: {name, value}, chatId});
    setName('');
    setValue('');
  };

  return (
    <div className="flex items-center border-b border-gray-200 py-1 mr-4">
      <div className="flex-1 flex space-x-1 items-center font-mono">
        <span className="pl-1">name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border border-b-2 border-b-blue-700 px-2 py-0.5 w-1/3 font-mono"
        />
        <span className="pl-1">value</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded border border-b-2 border-b-blue-700 px-2 py-0.5 w-2/3 font-mono"
        />
      </div>
      <button onClick={handleAdd} className="text-gray-600 hover:text-gray-800 hover:bg-amber-200 rounded p-1 ml-2">
        <RiAddCircleLine />
      </button>
    </div>
  );
};

export default VariableAdd;
