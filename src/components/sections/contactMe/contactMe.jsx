import Header from "../conponents/header";
import { SocialIcon } from 'react-social-icons';

export default function ContactMe(props)
{
    return (
        <div ref={props.innerRef} className="flex-none w-full h-fit flex flex-col md:p-16 p-4 pb-0">
            <Header>Contact Me</Header>
            <div className="w-full flex flex-col gap-6">
                <div className='w-full flex flex-col items-center border-b-4 border-blue gap-3'>
                    <img className="w-56 rounded-full" src="./me.jpg"></img>
                    <div className="text-6xl text-blue">Abinadi Swapp</div>
                </div>

                <div className="w-full flex justify-center gap-6">
                    <div className="text-white text-2xl">abinadiswapp@gmail.com</div>
                </div>

                <div className="w-full flex justify-center  mb-20">
                   
                        <SocialIcon fgColor="#FFFF" url="mailto:abinadiswapp@gmail.com" />
                        <SocialIcon fgColor="#FFFF" url="https://www.linkedin.com/in/aswapp-0104ab1b7" />
                        <SocialIcon fgColor="#FFFF" url="https://github.com/ab1nadi" />
                </div>
            </div>
        </div>
    )
}