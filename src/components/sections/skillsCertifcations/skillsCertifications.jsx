import Header from "../conponents/header"

export default function SkillsAndCerts(props)
{
    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex-1 w-full">
                <Header>Skills</Header>
            </div>
            <div className="flex-1 w-full">
                <Header>Certifications</Header>
            </div>
            
        </div>
    )
}