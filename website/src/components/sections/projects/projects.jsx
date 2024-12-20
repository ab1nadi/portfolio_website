import Header from "../conponents/header"
import projectData from "../../../../data/projects"
import { gql, useQuery } from '@apollo/client';

const GET_PROJECTS = gql`
  query Query($pagination: PaginationArg) {
  projects(pagination: $pagination) {
    demo_url
    description
    github_url
    title
    bullet_points
    date
  }
}
`;

export default function Projects(props)
{
    const { loading, error, data } = useQuery(GET_PROJECTS,
        {
            variables:
            {
                "pagination": {
                    "pageSize": 50,
                }
                }
        }
    );

    if(loading) return <div> fetching... </div>
    else if(error) return <div>Failed to fetch skills....</div>


    else return (
        <div ref={props.innerRef} className="flex-none w-full h-fit flex flex-col md:p-16 p-4 pb-0">
            <Header>Projects</Header>
            <div className="w-full h-fit flex overflow-hidden overflow-x-auto gap-3">
                {data.projects.map((proj,k)=><Project key={k} title={proj.title} date={proj.date} github={proj.github_url} description={proj.description} bulletpoints={proj.bullet_points} demo={proj.demo_url}/>)}
            </div>
        </div>
    )
}


function Project(props)
{
    return (
        <div className=" flex-none md:w-96 w-80  border-white border-2 rounded-lg bg-white flex flex-col gap-3 p-3">
            <div className=" flex-none w-full h-16 whitespace-normal md:text-2xl text-xl border-b-4 border-blue text-black font-bold">{props.title}</div>
            <div className=" flex w-full justify-between items-center">

                {
                    props.demo !=false ?
                    <a className=" h-fit p-3 bg-black text-white rounded-md hover:bg-slate-600" href={props.demo} target="_blank">demo</a>
                    :
                    ""
                }   
                {
                    props.github != false ? 
                    <a className=" h-fit p-3 bg-black text-white rounded-md hover:bg-slate-600" href={props.github} target="_blank">github</a>
                    : 
                    ""
                }
                <div className=" w-1/3 text-2xl font italic">{props.date}</div>
            </div>

            <div className="w-full h-25 whitespace-normal text-xl">
                {props.description}
            </div>

            <div className="w-full flex flex-col gap-3">
                {props.bulletpoints.map((b,k)=>
                {
                    return (
                        <div key={k} className="text-xl whitespace-normal">- {b}</div>
                    )
                })}
            </div>



        </div>
    )
}