import { gql, useQuery } from '@apollo/client';
import { RefObject } from "react"
import { Badge } from '@/components/ui/badge';
import Section from "../section"

const GET_SKILLS = gql`
  query Query($pagination: PaginationArg) {
    skills(pagination: $pagination) {
      title
    }
  }
`;

interface Skill 
{
    title:string
}

interface SkillProps
{
    innerRef:RefObject<HTMLDivElement>
}


export default function Skills(props:SkillProps)
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

    if(loading) 
        return (
            <Section innerRef={props.innerRef} header="Skills">
                Fetching skills.....
            </Section>
        )
    else if(error) 
        return (
            <Section innerRef={props.innerRef} header="Skills">
                {"Failed to fetch skills :("}
            </Section>
        )

    else return(
        <Section innerRef={props.innerRef} header="Skills">
            <div className="w-full h-60 flex flex-col gap-3 flex-wrap">
                {data.skills.map((skill:Skill,k:number)=><Badge key={k} className="md:text-xl text-lg w-fit">{skill.title}</Badge>)}
            </div>
        </Section>
    )
}