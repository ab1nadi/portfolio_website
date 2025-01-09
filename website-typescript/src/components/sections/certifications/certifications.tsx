
import { gql, useQuery } from '@apollo/client';
import { RefObject } from 'react';
import Section from '../section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GET_CERTIFICATIONS = gql`
  query Certifications_connection($pagination: PaginationArg) {
  certifications_connection(pagination: $pagination) {
    nodes {
      title
      skills
      date
      credit_url
    }
  }
}
`;

interface Certification 
{
    title:string,
    skills:string[],
    date:string,
    credit_url:string
}

interface CertificationProps
{
    innerRef:RefObject<HTMLDivElement>
}

export default function Certifications(props:CertificationProps)
{

    const { loading, error, data } = useQuery(GET_CERTIFICATIONS,
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
            <Section innerRef={props.innerRef} header="Certifications">
                Fetching certifications.....
            </Section>
        )
    else if(error) 
        return (
            <Section innerRef={props.innerRef} header="Certifications">
                {"Failed to fetch certifications :("}
            </Section>
        )

    else return (
        <Section innerRef={props.innerRef} header="Certifications">
            <div className="w-full h-fit flex overflow-hidden overflow-x-auto gap-3">
                {data.certifications_connection.nodes.map((cert:Certification, key:number)=>{
                return  <Card key={key} className='min-w-[400px] w-full'>
                            <CardHeader>
                                <CardTitle className="text-3xl min-h-32">{cert.title}</CardTitle>
                                <CardDescription className="font-bold text-xl flex w-full justify-between">{cert.date} <Button><a href={cert.credit_url}>Credit</a></Button></CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    
                                </div>
                                <div>
                                    {cert.skills.map((b:string, key:number)=> 
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