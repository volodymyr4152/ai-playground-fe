import React from 'react';
import './App.css';
import MainChatPage from "./pages/MainChatPage";
import {QueryClient, QueryClientProvider} from "react-query";
import {ChatListCtxProvider} from "./contexts/ChatListCtx";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000
    }
  }
});

function App() {

  return <QueryClientProvider client={queryClient}>
    <ChatListCtxProvider>
      <MainChatPage/>
    </ChatListCtxProvider>
  </QueryClientProvider>;
}

export default App;
