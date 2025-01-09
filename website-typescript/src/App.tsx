
import { useRef } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


import Home from "./components/sections/home/home";
import Skills from './components/sections/skills/skills';
import Experiences from './components/sections/experience/experience';
import Certifications from './components/sections/certifications/certifications';
import Projects from './components/sections/projects/projects';
import ContactMe from './components/sections/contactMe/contactMe';

export default function App() {

  const home = useRef<HTMLDivElement>(null);
  const skills = useRef<HTMLDivElement>(null);
  const experience = useRef<HTMLDivElement>(null);
  const certifications = useRef<HTMLDivElement>(null);
  const projects = useRef<HTMLDivElement>(null);
  const contactMe = useRef<HTMLDivElement>(null);

  return (
    <SidebarProvider>
      <AppSidebar buttons={[  
                              {text:"Home", ref:home}, 
                              {text:"Skills", ref:skills}, 
                              {text:"Experience", ref:experience},
                              {text:"Certifications",ref:certifications},
                              {text:"Projects", ref:projects},
                              {text:"Contact Me", ref:contactMe}]}/>
      <main className='w-full overflow-hidden bg-gradient-to-r from-slate-200 to-secondary'>
        
        <div className='fixed w-screen h-screen'>
          <SidebarTrigger/>
        </div>

        <Home innerRef={home}/>
        <Skills innerRef={skills}/>
        <Experiences innerRef={experience}/>
        <Certifications innerRef={certifications}/>
        <Projects innerRef={projects}/>
        <ContactMe innerRef={contactMe}/>

      </main>
    </SidebarProvider>
  )
}