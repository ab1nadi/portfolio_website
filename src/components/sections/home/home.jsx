import { Typewriter } from "react-simple-typewriter"
import Rubiks from "../../rubiks/rubiks"

export default function Home(props)
{
    return (
        <div className="w-full h-full">
            <div className="font-cedarville-cursive text-blue  lg:text-9xl md:text-6xl  text-5xl  ">
                Abinadi Swapp
            </div>

            <div className=" text-blue  lg:text-6xl md:text-3xl text-2xl">
                <Typewriter
                    words={['Software Engineer', 'Gamer', 'Workout Fanatic']} cursor 
                    typeSpeed={120}
                    deleteSpeed={120}
                    loop={true}/>
            </div>

            <div className=" text-blue  lg:text-4xl md:text-3xl text-xl w-full whitespace-normal text-ellipsis mt-1">
                Bringing excellence to whatever the fruck I do.
            </div>

            <div className="grow flex md:justify-end justify-center md:items-end items-center  w-full h-full md:pr-20 md:pb-32">
                <Rubiks startBounds={{lower:1000, upper:10000}} className=" md:w-[400px] md:h-[400px] w-[200px] h-[200px]"></Rubiks>
            </div>
        </div>
    )
}