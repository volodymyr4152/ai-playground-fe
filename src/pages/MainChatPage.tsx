import React, {useState} from "react";
import ConversationContext from "../components/ConversationContext";
import axios from "axios";

const reqInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 3000,
});


function MainChatPage() {
  const [contexts, setContexts] = useState({});
  const [activeContext, setActiveContext] = useState('');

  if (Object.keys(contexts).length === 0) {
    reqInstance.get(
      'aipe/context/'
    ).then((response) => {
      console.log(response.data);
      setContexts(response.data)
      if (activeContext === '' && Object.keys(response.data).length > 0) {
        setActiveContext(Object.keys(response.data)[0]);
      }
    });
  }

  // @ts-ignore
  return (
    <div className="MainChatPage flex flex-row flex-nowrap flex-auto max-h-screen overflow-y-auto">
      <div className="max-w-80 basis-1/4 max-h-full overflow-y-auto overflow-x-hidden">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cupiditate doloremque natus neque non quae quaerat quam vero vitae voluptates. Accusamus corporis cum esse, incidunt libero quasi vel. Accusantium ad aspernatur at consectetur culpa, cumque dolorem doloremque dolorum eligendi enim esse harum ipsam molestias mollitia neque quae qui quia quidem quod, rerum sint tempore veritatis voluptatem! Commodi consequatur cumque dignissimos ea error, eveniet, labore magnam, minus molestias non reprehenderit sapiente voluptate. Accusantium assumenda consequuntur, error facilis laborum quaerat repellendus sed voluptas? Eius eveniet fuga neque quis. Aliquid asperiores aspernatur, assumenda culpa dicta ex illo ipsam non placeat porro, quod voluptatum.</div>
      <div className="basis-3/4 flex-grow chat-content max-h-full overflow-y-auto overflow-x-hidden">
        {activeContext && <ConversationContext key={activeContext} conversationContext={contexts[activeContext]}/>}
      </div>
    </div>
  );
}

export default MainChatPage
