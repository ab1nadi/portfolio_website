import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://randomdomain-url-etc.online/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache()
});

import { useRef } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


import Home from "./components/sections/home/home";

export default function App() {

  const home = useRef<HTMLDivElement>(null);

  return (
    <ApolloProvider client={client}>
      <SidebarProvider>
        <AppSidebar buttons={[]}/>
        <main className='w-full'>
          <SidebarTrigger />
          
          <Home innerRef={home}/>

        </main>
      </SidebarProvider>
    </ApolloProvider>
  )
}