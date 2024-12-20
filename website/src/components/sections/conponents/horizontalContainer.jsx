import { useEffect } from "react"




export default function HorizontalContainer(props)
{


    useEffect(()=>{

    });
    
    return (
        <div className="grow w-full h-max overflow-x-scroll overflow-y-hidden flex flex-row gap-4 p-3">
            {props.children}
        </div>
    )
}