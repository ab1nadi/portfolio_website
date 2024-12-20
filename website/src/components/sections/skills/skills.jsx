import Header from "../conponents/header"
import { gql, useQuery } from '@apollo/client';

const GET_SKILLS = gql`
  query Query($pagination: PaginationArg) {
    skills(pagination: $pagination) {
      title
    }
  }
`;
export default function Skills(props)
{
    const { loading, error, data } = useQuery(GET_SKILLS,
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
            <Header>Skills</Header>
            <div className="w-full h-60 flex flex-col gap-3 flex-wrap">
                {data.skills.map((skill,k)=><div key={k} className=" text-white md:text-xl text-lg">{skill.title}</div>)}
            </div>
        </div>
    )
}