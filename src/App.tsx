import React from 'react';
import { Theme } from '@radix-ui/themes';
import './App.css';
import MainChatPage from "./pages/MainChatPage";
import {QueryClient, QueryClientProvider} from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import {ChatListCtxProvider} from "./contexts/ChatListCtx";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000
    }
  }
});

function App() {

  return <QueryClientProvider client={queryClient}>
    <Theme>
      <ChatListCtxProvider>
        <MainChatPage/>
      </ChatListCtxProvider>
    </Theme>
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>;
}

export default App;
