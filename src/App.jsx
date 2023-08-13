import './App.css'
import Rubiks from './components/rubiks/rubiks';
import { Typewriter } from 'react-simple-typewriter'
import Section from './components/sections/section';
import { useRef } from 'react';
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

        <div className=" w-80 md:relative fixed  md:left-0 -left-80  h-full bg-green p-8">
          <div className="w-full h-28 flex justify-center items-center">
          <Rubiks className=" w-[100px] h-[100px]"></Rubiks>
          </div>
          <hr className="my-12 h-1 rounded-sm border-t-0  bg-blue opacity-100 " />
          <div className="flex flex-col gap-4">
            <button onClick={()=>skills.current.scrollIntoView({behavior: 'smooth'})} className='w-full text-left text-2xl bold '>Skills</button>
            <button onClick={()=>projects.current.scrollIntoView({behavior: 'smooth'})} className='w-full text-left text-2xl bold '>projects</button>
            <button onClick={()=>certificates.current.scrollIntoView({behavior: 'smooth'})} className='w-full text-left text-2xl bold '>certificates</button>
            <button onClick={()=>demos.current.scrollIntoView({behavior: 'smooth'})} className='w-full text-left text-2xl bold '>demos</button>
            <button onClick={()=>contactMe.current.scrollIntoView({behavior: 'smooth'})} className='w-full text-left text-2xl bold '>contactMe</button>
          </div>
          
        </div>

        <div className="snap-y snap-mandatory w-full h-screen overflow-x-hidden pl-16 pr-16  text-clip white whitespace-nowrap	flex flex-col gap-3">
          
          <Section innerRef={home}>
          <div className="font-cedarville-cursive text-blue  lg:text-9xl md:text-6xl  text-5xl mt-16">
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


          <div className="grow flex justify-end items-end pr-20 pb-20">
            <Rubiks className=" w-[400px] h-[400px]"></Rubiks>
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
