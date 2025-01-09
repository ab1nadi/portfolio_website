import { gql, useQuery } from '@apollo/client';
import { RefObject } from 'react';
import Section from '../section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

interface Project 
{
    demo_url:string,
    description:string,
    github_url:string,
    title:string,
    bullet_points:string[],
    date:string
}

interface ProjectsProps
{
    innerRef:RefObject<HTMLDivElement>
}

export default function Projects(props:ProjectsProps)
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

    if(loading) 
        return (
            <Section innerRef={props.innerRef} header="Projects">
                Fetching projects.....
            </Section>
        )
    else if(error) 
        return (
            <Section innerRef={props.innerRef} header="Projects">
                {"Failed to fetch projects :("}
            </Section>
        )

    else return(
        <Section innerRef={props.innerRef} header="Projects">
            <div className=" w-full h-fit flex overflow-hidden overflow-x-auto gap-3">
                {data.projects.map((proj:Project,key:number)=>{
                     
                    return  <Card key={key} className='min-w-[400px]'>
                                <CardHeader>
                                    <CardTitle className="text-3xl text-nowrap">{proj.title}</CardTitle>
                                    <CardDescription className="font-bold text-xl">{proj.date}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex gap-2 w-full h-10'>
                                        {proj.demo_url != "false" ? <Button><a href={proj.demo_url}>Open Demo</a></Button> : ""}
                                        {proj.github_url != "false" ? <Button><a href={proj.github_url}>gitGithub</a></Button> : ""}
                                    </div>
                                    <div className="text-xl">
                                        {proj.description}
                                    </div>
                                    <div>
                                        {proj.bullet_points.map((b:string, key:number)=> 
                                        {
                                            return  <div key={key}>
                                                        <span className='font-bold mr-2'>-</span>
                                                        <span>{b}</span>
                                                    </div>
                                        })}
                                    </div>
                                </CardContent>

                            </Card>
                })}
            </div>
        </Section>
    )
}