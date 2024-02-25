import React from 'react';
import './App.css';
import MainChatPage from "./pages/MainChatPage";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

function App() {

  return <QueryClientProvider client={queryClient}>
    <MainChatPage/>
  </QueryClientProvider>;
}

export default App;
