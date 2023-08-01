export default function Section(props)
{
    return (
        <div className="snap-start min-h-screen w-full  flex flex-col">
            {props.children}
        </div>
    )
}