import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Rubiks from "./rubiks/rubiks"
import {RefObject } from "react"

interface AppSidebarProps 
{
    buttons: {text:string, ref:RefObject<HTMLElement>}[]
}

export function AppSidebar(props:AppSidebarProps) {
  return (
    <Sidebar>
        <SidebarHeader>
            <div className="w-full h-28 flex justify-center items-center">
                <Rubiks startBounds={{lower:1000, upper:10000}} className=" w-[100px] h-[100px]"></Rubiks>
            </div>

        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                {props.buttons.map((item) => (
                    <SidebarMenuItem key={item.text}>
                    <SidebarMenuButton asChild>
                        <div onClick={()=>{
                            if(item.ref.current != null)
                                item.ref.current.scrollIntoView({behavior: 'smooth'})
                        }}>
                        <span>{item.text}</span>
                        </div>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
}
