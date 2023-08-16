export default function Section(props)
{
    return (
        <div ref={props.innerRef} className="snap-start flex-none min-h-[500px] h-screen  grow w-full  flex flex-col p-16">
            {props.children}
        </div>
    )
}