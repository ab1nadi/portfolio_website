import Header from "../conponents/header"
import skills from "../../../../data/skills"
export default function Skills(props)
{
    return (
        <div ref={props.innerRef} className="flex-none w-full h-fit flex flex-col md:p-16 p-4 pb-0">
            <Header>Skills</Header>
            <div className="w-full h-60 flex flex-col gap-3 flex-wrap">
                {skills.map((skill,k)=><div key={k} className=" text-white md:text-xl text-lg">{skill}</div>)}
            </div>
        </div>
    )
}