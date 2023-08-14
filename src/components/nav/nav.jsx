import Rubiks from "../rubiks/rubiks"

import { CSSTransition } from "react-transition-group"
import { Squash as Hamburger } from 'hamburger-react'
import { useRef, useState } from "react"

export default function Nav(props)
{
    const navRef = useRef(null);

    const [ showNav, setShowNav] = useState(false);



    return (
        <>  

            <CSSTransition
                            in={showNav}
                            nodeRef={navRef}
                            timeout={500}
                            classNames={{
                                enter: '-translate-x-80',
                                enterActive: 'translate-x-0',
                                exit: '-translate-x-80',
                            }}
                            unmountOnExit
                            onEnter={() => {}}
                            onExited={() => {}}
                            >
                <div ref={navRef} className="transition-all duration-300 -translate-x-80 ease-out  w-80 overflow-hidden fixed  md:hidden block z-40   h-full bg-green ">
                    <div className="w-full h-28 flex justify-center items-center">
                    <Rubiks startBounds={{lower:1000, upper:10000}} className=" w-[100px] h-[100px]"></Rubiks>
                    </div>


                    <hr className="my-4 h-1 w-full border-t-0  bg-black opacity-100 " />
                    
                    <div className=" pl-8">
                            <div className="flex flex-col gap-4">
                                {props.buttons.map((b,k)=> {
                                    return <button key={k} onClick={()=>b.ref.current.scrollIntoView({behavior: 'smooth'})} className='w-full text-left text-2xl bold text-black'>{b.text}</button>
                                })}
                            </div>

                        </div>

                </div>

            </CSSTransition>

            <div className="fixed md:hidden block z-50 p-4">
                <Hamburger toggled={showNav} toggle={setShowNav} color={"#48ACF0"} size={40}/>
            </div>

            <div ref={navRef} className=" w-80 md:block hidden h-full bg-green ">
                    <div className="w-full h-28 flex justify-center items-center">
                    <Rubiks startBounds={{lower:1000, upper:10000}} className=" w-[100px] h-[100px]"></Rubiks>
                    </div>

                    <hr className="my-4 h-1 w-full border-t-0  bg-black opacity-100 " />
                    
                    <div className=" pl-8">
                            <div className="flex flex-col gap-4">
                                {props.buttons.map((b,k)=> {
                                    return <button key={k} onClick={()=>b.ref.current.scrollIntoView({behavior: 'smooth'})} className='w-full text-left text-2xl bold text-black'>{b.text}</button>
                                })}
                            </div>

                        </div>

            </div>
        </>
    )
}