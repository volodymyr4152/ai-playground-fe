import React from 'react';
import './App.css';
import MainChatPage from "./pages/MainChatPage";
import {QueryClient, QueryClientProvider} from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000
    }
  }
});

function App() {

  return <QueryClientProvider client={queryClient}>
    <MainChatPage/>
  </QueryClientProvider>;
}

export default App;
