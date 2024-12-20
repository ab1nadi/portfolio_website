import Header from "../conponents/header"
import projectData from "../../../../data/projects"
import { gql, useQuery } from '@apollo/client';

const GET_EXPERIENCE = gql`
query Query($pagination: PaginationArg) {
  experiences(pagination: $pagination) {
    description
    start_date
    title
    current_job
    end_date
    organization
  }
}
`;

export default function Experiences(props)
{
    const { loading, error, data } = useQuery(GET_EXPERIENCE,
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
            <Header>Experience</Header>
            <div className="w-full h-fit flex overflow-hidden overflow-x-auto gap-3">
                {data.experiences.map((exp,k)=><Experience key={k} title={exp.title} start_date={exp.start_date} end_date={exp.end_date} description={exp.description} currentjob={exp.current_job} organization={exp.organization}/>)}
            </div>
        </div>
    )
}


function Experience(props)
{
    return (
        <div className=" flex-none md:max-w-xl max-w-lg w-full  border-white border-2 rounded-lg bg-white flex flex-col gap-3 p-3">
            <div className=" flex-none w-full h-16 whitespace-normal md:text-2xl text-xl border-b-4 border-blue text-black font-bold">{props.title} @ {props.organization} </div>
            <div className=" flex w-full justify-between items-center">

                <div className=" w-1/3 text-2xl font italic">{props.start_date} - {props.currentjob ? "current" : props.end_date}</div>
            </div>

            <div className="w-full h-25 whitespace-normal text-xl">
                {props.description}
            </div>
           
        </div>
    )
}