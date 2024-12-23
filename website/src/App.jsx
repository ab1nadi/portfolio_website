import './App.css'
import { useEffect, useRef, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://randomdomain-url-etc.online/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache()
});
// components
import Nav from './components/nav/nav';

// sections
import Home from './components/sections/home/home';
import Experiences from './components/sections/experience/experience';
import Skills from './components/sections/skills/skills';
import Certifications from './components/sections/certifications/certifications';
import Projects from './components/sections/Projects/projects';
import ContactMe from './components/sections/contactMe/contactMe';

// data

function App() {


  const [visits,setVisits] = useState(0);

  const home = useRef(0);
  const experiences = useRef(0);
  const skills = useRef(0);
  const certs = useRef(0);
  const projects = useRef(0);
  const contactMe = useRef(0);





  return (
    <>
      <ApolloProvider client={client}>

      <div className="w-full h-screen bg-gradient-to-r from-black  to-[#4A516D]  flex">

        <Nav  buttons={[{text:"Home", ref:home}, {text:"Skills", ref:skills}, {text:"Experience", ref:experiences}, {text:"Certificaions", ref:certs}, {text:"Projects", ref:projects},  {text:"Contact Me", ref:contactMe}]}/>
        
        <div className="w-full h-screen overflow-x-hidden text-clip white whitespace-nowrap	flex flex-col gap-3">
          
          <Home innerRef={home}/>

          <Skills innerRef={skills}/>

          <Experiences innerRef={experiences}/>

          <Certifications innerRef={certs}/>

          <Projects innerRef={projects}/>

          <ContactMe innerRef={contactMe}/>

        </div>
      </div>
      </ApolloProvider>
    </>
  )
}

export default App
