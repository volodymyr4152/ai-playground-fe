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
    <div className="flex items-center border-b border-gray-200 py-2 mr-5">
      <div className="flex-1 flex space-x-1 items-center">
        <span className="pl-1">name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-2 py-0.5 w-20"
        />
        <span className="pl-1">value</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-gray-300 rounded px-2 py-0.5 w-28"
        />
      </div>
      <div>
        <button onClick={handleAdd} className="text-gray-600 hover:text-gray-800 hover:bg-amber-200 rounded p-1">
          <RiAddCircleLine />
        </button>
      </div>
    </div>
  );
};

export default VariableAdd;
