export default function Section(props)
{
    return (
        <div ref={props.innerRef} className="snap-start min-h-screen w-full  flex flex-col">
            {props.children}
        </div>
    )
}