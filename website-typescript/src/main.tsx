import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://randomdomain-url-etc.online/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache()
});



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </StrictMode>
)
