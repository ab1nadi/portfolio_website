import Header from "./conponents/header"

export default function Section(props)
{
    return (
        <div ref={props.innerRef} className="flex-none w-full h-fit flex flex-col md:p-16 p-4 pb-0">
            <Header>{props.header}</Header>
            {props.children}
        </div>
    )
}