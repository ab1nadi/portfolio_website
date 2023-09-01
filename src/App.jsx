import './App.css'
import { useEffect, useRef, useState } from 'react';

import countapi from 'countapi-js';


// components
import Nav from './components/nav/nav';

// sections
import Home from './components/sections/home/home';
import Skills from './components/sections/skills/skills';
import Certifications from './components/sections/certifications/certifications';
import Projects from './components/sections/Projects/projects';
import ContactMe from './components/sections/contactMe/contactMe';

// data

function App() {


  const [visits,setVisits] = useState(0);

  const home = useRef(0);
  const skills = useRef(0);
  const certs = useRef(0);
  const projects = useRef(0);
  const contactMe = useRef(0);


  useEffect(()=>
  {
    countapi.visits().then((result) => {
      setVisits(result);
    });
  }, []);


  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-black  to-[#4A516D]  flex">

        <Nav visits={visits} buttons={[{text:"Home", ref:home}, {text:"Skills", ref:skills}, {text:"Certificaions", ref:certs}, {text:"Projects", ref:projects},  {text:"Contact Me", ref:contactMe}]}/>
        
        <div className="w-full h-screen overflow-x-hidden text-clip white whitespace-nowrap	flex flex-col gap-3">
          
          <Home innerRef={home}/>

          <Skills innerRef={skills}/>

          <Certifications innerRef={certs}/>

          <Projects innerRef={projects}/>

          <ContactMe innerRef={contactMe}/>

        </div>
      </div>
    </>
  )
}

export default App
