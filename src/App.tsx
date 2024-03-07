import React from 'react';
import { Theme } from '@radix-ui/themes';
import './App.css';
import MainChatPage from "./pages/MainChatPage";
import {ChatListCtxProvider} from "./contexts/ChatListCtx";
import {QueryClient, QueryClientProvider, } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
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
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>;
}

export default App;
