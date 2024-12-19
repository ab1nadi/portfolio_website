import { Typewriter } from "react-simple-typewriter"
import { useEffect,useState } from "react"
import Rubiks from "../../rubiks/rubiks"

import { isBrowser } from "react-device-detect";

export default function Home(props)
{

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [fadeIn, setFadeIn] = useState(false);

    const [hover, setHover] = useState("");
  

    let fetchQuote = async()=> 
    {
        const response = await fetch("https://stoic.tekloon.net/stoic-quote");
        const result = await response.json();
            
        setQuote(result.quote);
        setAuthor(result.author);
        setFadeIn(true);

    }
  
    useEffect(()=>
    {
        fetchQuote();
        
        if(isBrowser)
            setHover("hover:text-gray-600")
    },[])


    return (
        <div className="flex-none min-h-[500px] h-screen w-full  flex flex-col md:p-16 p-4 md:pt-16 pt-20 " ref={props.innerRef}>
            <div className="font-cedarville-cursive text-blue  lg:text-9xl md:text-6xl  text-5xl  ">
                Abinadi Swapp
            </div>

            <div className=" text-blue  lg:text-6xl md:text-3xl text-2xl">
                <Typewriter
                    words={['Software Engineer', 'Gamer', 'Workout Fanatic', 'Foodie']} cursor 
                    typeSpeed={120}
                    deleteSpeed={120}
                    loop={true}/>
            </div>

            <div className=" flex md:justify-end justify-center md:items-end items-center  w-full h-full md:pr-20 md:pb-32">
                <Rubiks startBounds={{lower:1000, upper:10000}} className=" md:w-[400px] md:h-[400px] w-[200px] h-[200px]"></Rubiks>
            </div>
        </div>
    )
}