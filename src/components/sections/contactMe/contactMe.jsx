import Header from "../conponents/header";
export default function ContactMe(props)
{
    return (
        <div ref={props.innerRef} className="flex-none w-full h-fit flex flex-col md:p-16 p-4 pb-0">
            <Header>Contact Me</Header>
            <div className="w-full">
                <div className='w-full flex flex-col items-center border-b-4 border-blue gap-3'>
                    <img className="w-56 rounded-full" src="./me.jpg"></img>
                    <div className="text-6xl text-blue">Abinadi Swapp</div>
                </div>
                <div className="text-white  text-4xl mt-3">
                    Email me at: <a href='mailto:abinadiswapp@gmail.com'>abinadiswapp@gmail.com</a>
                </div>
                <div className="text-white  text-4xl mt-3 mb-3">
                    Connect with me on Linkedln: <a href='https://www.linkedin.com/in/aswapp-0104ab1b7'>https://www.linkedin.com/in/aswapp-0104ab1b7</a>
                </div>
            </div>
        </div>
    )
}