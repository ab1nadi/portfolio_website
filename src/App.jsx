import { useRef, useState, useEffect} from 'react'
import './App.css'
import { generateTree } from '../lib/tree';

import { Typewriter } from 'react-simple-typewriter'

function App() {



  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-black  to-[#4A516D]  flex">
       
        <div className=" w-80 md:relative fixed  md:left-0 -left-80  h-full bg-green p-3">
          <div className="w-full h-28"></div>
          <hr class="my-12 h-1 rounded-sm border-t-0  bg-blue opacity-100 " />
        </div>

        <div className=" w-full h-full overflow-hidden p-16  text-clip white whitespace-nowrap	flex flex-col gap-3">
          <div className="font-cedarville-cursive text-blue  lg:text-9xl md:text-6xl  text-5xl">
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

        </div>
      </div>
    </>
  )
}

export default App
