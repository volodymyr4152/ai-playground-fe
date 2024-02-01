import React, {useState} from 'react';
import './App.css';
import axios from "axios";
import { TConversationContext } from "./types/contextTypes";

const reqInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 3000,
});


interface IContextTagProps {
  contextData: TConversationContext;
}

function Context(props: IContextTagProps) {
  const contextData = props.contextData;
  return (
    <div>
      <h1> ID </h1>
      <p> {contextData.id} </p>
      <h1> Main goal </h1>
      <p> {contextData.main_goal} </p>
      <h1> all content </h1>
      <pre> {JSON.stringify(contextData, null, 2)} </pre>
    </div>
  );
}

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
          (key) => <Context key={key} contextData={contexts[key]}/>
      )}
    </div>
  );
}

export default App;
