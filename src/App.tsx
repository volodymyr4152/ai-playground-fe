import React, {useState} from 'react';
import './App.css';
import axios from "axios";
import ConversationContext from './components/ConversationContext';

const reqInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 3000,
});


function App() {
  const [contexts, setContexts] = useState({});
  if (Object.keys(contexts).length === 0) {
    reqInstance.get(
      'aipe/context/b4932379-513d-4ad5-8587-3219ad6dc959/'
    ).then((response) => {
      console.log(response.data);
      setContexts({'b4932379-513d-4ad5-8587-3219ad6dc959': response.data})
    });
  }

  // @ts-ignore
  return (
    <div className="App">
      {Object.keys(contexts).map(
          (key) => <ConversationContext key={key} conversationContext={contexts[key]}/>
      )}
    </div>
  );
}

export default App;
