import { RefObject } from "react";
import SocialMedia from "@/components/socialMedia";
interface ContactMeProps
{
    innerRef: RefObject<HTMLDivElement>
}

export default function ContactMe(props:ContactMeProps)
{
    return (
        <div ref={props.innerRef} className="flex-none w-full h-screen flex flex-col md:p-16 p-4 pb-0">

            <div className="w-full flex flex-col gap-6">
                <div className='w-full flex flex-col items-center border-b-4 border-blue gap-3'>
                    <img className="md:w-56 w-48 rounded-full" src="./me.jpg"></img>
                    <div className="md:text-6xl text-4xl text-blue">Abinadi Swapp</div>
                </div>

                <div className="w-full flex justify-center gap-6">
                    <div className="text-2xl">abinadiswapp@gmail.com</div>
                </div>

                <SocialMedia/>


                <div className="h-20"></div>
            </div>
        </div>
    )
}