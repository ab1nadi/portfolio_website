import './App.css'
import { useRef } from 'react';

// components
import Nav from './components/nav/nav';
import Section from './components/sections/section';

// sections
import Home from './components/sections/home/home';
import SkillsAndCerts from './components/sections/skillsCertifcations/skillsCertifications';
import Projects from './components/sections/projects/projects';
import Demos from './components/sections/demos/demos';
import ContactMe from './components/sections/contactMe/contactMe';

function App() {

  const home = useRef(0);
  const skillsCerts = useRef(0);
  const projects = useRef(0);
  const demos = useRef(0);
  const contactMe = useRef(0);


  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-black  to-[#4A516D]  flex">

        <Nav buttons={[{text:"Home", ref:home}, {text:"Skills & Certs", ref:skillsCerts}, {text:"Projects", ref:projects}, {text:"Demos", ref:demos}, {text:"Contact Me", ref:contactMe}]}/>
        
        <div className="snap-y snap-mandatory w-full h-screen overflow-x-hidden text-clip white whitespace-nowrap	flex flex-col gap-3">
          
          <Section innerRef={home}>
            <Home/>
          </Section>

          <Section innerRef={skillsCerts}>
            <SkillsAndCerts/>
          </Section>

          <Section innerRef={projects}>
            <Projects/>
          </Section>

          <Section innerRef={demos}>
            <Demos/>
          </Section>

          <Section innerRef={contactMe}>
            <ContactMe/>
          </Section>

        </div>
      </div>
    </>
  )
}

export default App
