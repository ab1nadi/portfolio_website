import Section from "../section"
import Header from "../conponents/header"
import certifications from "../../../../data/certifications"
export default function Certifications(props)
{
    return (
        <div ref={props.innerRef} className="flex-none w-full h-fit flex flex-col md:p-16 p-4 pb-0">
            <Header>Certifications</Header>
            <div className="w-full h-fit flex overflow-hidden overflow-x-auto gap-3">
                {certifications.map((cert, k)=><Cert key={k} title={cert.title} date={cert.date} skill={cert.skill} url={cert.url}/>)}
            </div>
        </div>
    )
}


function Cert(props)
{
    return (
        <div className=" flex-none md:w-96 w-80  border-white border-2 rounded-lg bg-white flex flex-col gap-3 p-3">
            <div className=" flex-none w-full  h-28 whitespace-normal text-2xl border-b-4 border-blue text-black font-bold">{props.title}</div>
            <div className=" flex w-full justify-between items-center">
                <a className=" h-fit p-3 bg-black text-white rounded-md hover:bg-slate-600" href={props.url} target="_blank">credit</a>
                <div className=" w-1/2 text-2xl font italic">{props.date}</div>
            </div>
            
            <div className="grow  w-full  text-2xl whitespace-normal">Relevant Skill: {props.skill}</div>
        </div>
    )
}