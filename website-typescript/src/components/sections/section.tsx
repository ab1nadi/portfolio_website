import { type RefObject, ReactNode } from "react"
interface SectionProps
{
    innerRef:RefObject<HTMLDivElement>,
    header:string,
    children:ReactNode
}

export default function Section(props:SectionProps)
{
    return (
        <div ref={props.innerRef} className="flex-none w-full h-fit flex flex-col md:p-16 p-4 pb-0 mb-8">
            <div className="text-5xl mb-4">{props.header}</div>
            {props.children}
        </div>
    )
}