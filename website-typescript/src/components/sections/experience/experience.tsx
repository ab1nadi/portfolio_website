import { gql, useQuery } from '@apollo/client';
import { RefObject } from 'react';
import Section from '../section';
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

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

interface Experience
{
    description:string,
    start_date:string,
    title:string,
    current_job:string,
    end_date:string,
    organization:string
}

interface ExperiencesProps
{
        innerRef:RefObject<HTMLDivElement>,
}

export default function Experiences(props:ExperiencesProps)
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


    if(loading) 
        return (
            <Section innerRef={props.innerRef} header="Experience">
                Fetching experience.....
            </Section>
        )
    else if(error) 
        return (
            <Section innerRef={props.innerRef} header="Experience">
                {"Failed to fetch experience :("}
            </Section>
        )

    else return (
        <Section innerRef={props.innerRef} header="Experience">
            <div className="w-full h-fit flex overflow-hidden overflow-x-auto gap-3">
                {data.experiences.map((exp:Experience,k:number)=>
                    {
                return  <Card key={k} className='max-w-xl w-full'>
                            <CardHeader>
                                <CardTitle className="text-3xl">{exp.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl">
                                    <span className='font-bold mr-2'>Organization:</span>
                                    <span>{exp.organization}</span>
                                </div>
                                <div className="text-xl">
                                    <span className='font-bold mr-2'>Time:</span>
                                    <span className='mr-2'>{exp.start_date}</span>
                                    <span className='mr-2'>to</span>
                                    { exp.current_job ? <span>current</span> : <span>{exp.end_date}</span>}
                                </div>
                                <div>
                                    {exp.description}
                                </div>
                            </CardContent>
                        </Card>
                    })}
            </div>
        </Section>
    )
}