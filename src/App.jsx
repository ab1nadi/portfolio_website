import './App.css'
import Rubiks from './components/rubiks/rubiks';
import { Typewriter } from 'react-simple-typewriter'
import Section from './components/sections/section';
import { useRef } from 'react';
import Nav from './components/nav/nav';
function App() {

  const home = useRef(0);
  const skills = useRef(0);
  const projects = useRef(0);
  const certificates = useRef(0);
  const demos = useRef(0);
  const contactMe = useRef(0);

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-black  to-[#4A516D]  flex">

        <Nav buttons={[{text:"Home", ref:home}, {text:"Skills", ref:skills}, {text:"Projects", ref:projects}, {text:"Certifications", ref:certificates}, {text:"Demos", ref:demos}, {text:"Contact Me", ref:contactMe}]}/>
        
        
        <div className="snap-y snap-mandatory w-full h-screen overflow-x-hidden pl-16 pr-16  text-clip white whitespace-nowrap	flex flex-col gap-3">
          
          <Section innerRef={home}>
          <div className="font-cedarville-cursive text-blue  lg:text-9xl md:text-6xl  text-5xl mt-16  ">
            Abinadi Swapp
          </div>

          <div className=" text-blue  lg:text-6xl md:text-3xl text-2xl">
            <Typewriter
              words={['Software Engineer', 'Gamer', 'Workout Fanatic']} cursor 
              typeSpeed={120}
              deleteSpeed={120}
              loop={true}
            />
          </div>

          <div className=" text-blue  lg:text-4xl md:text-3xl text-xl w-full whitespace-normal text-ellipsis mt-1">
            Bringing excellence to whatever the fruck I do.
          </div>


          <div className="grow flex md:justify-end justify-center items-end md:pr-20 pb-20">
            <Rubiks startBounds={{lower:1000, upper:10000}} className=" w-[400px] h-[400px]"></Rubiks>
          </div>

          </Section>



          <Section innerRef={skills}>
            <h1 className=" mt-10 text-blue">skills</h1>

          </Section>

          <Section innerRef={projects}>
            <h1 className=" mt-10 text-blue">projects</h1>

          </Section>

          <Section innerRef={certificates}>
            <h1 className=" mt-10 text-blue">certs</h1>
          </Section>

          <Section innerRef={demos}>
            <h1 className=" mt-10 text-blue">demos</h1>
          </Section>

          <Section innerRef={contactMe}>
            <h1 className=" mt-10 text-blue">contact me</h1>
          </Section>
          
          

        </div>
      </div>
    </>
  )
}

export default App
