import Header from "../conponents/header"

import { gql, useQuery } from '@apollo/client';

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

export default function Certifications(props)
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


    if(loading) return <div> fetching... </div>
    else if(error) return <div>Failed to fetch skills....</div>

    else return (
        <div ref={props.innerRef} className="flex-none w-full h-fit flex flex-col md:p-16 p-4 pb-0">
            <Header>Certifications</Header>
            <div className="w-full h-fit flex overflow-hidden overflow-x-auto gap-3">
                {data.certifications_connection.nodes.map((cert, k)=><Cert key={k} title={cert.title} date={cert.date} skills={cert.skills} url={cert.credit_url}/>)}
            </div>
        </div>
    )
}


function Cert(props)
{
    return (
        <div className=" flex-none md:w-96 w-80  border-white border-2 rounded-lg bg-white flex flex-col gap-3 p-3">
            <div className=" flex-none w-full  h-28 whitespace-normal md:text-2xl text-xl border-b-4 border-blue text-black font-bold">{props.title}</div>
            <div className=" flex w-full justify-between items-center">
                <a className=" h-fit p-3 bg-black text-white rounded-md hover:bg-slate-600" href={props.url} target="_blank">credit</a>
                <div className=" w-1/2 text-2xl font italic">{props.date}</div>
            </div>
            
            <div className="grow  w-full  text-2xl whitespace-normal">Relevant Skills: 
                <div>
                {props.skills.map((d, k)=> <div key={k}>- {d}</div>)}
                </div>
            </div>
        </div>
    )
}