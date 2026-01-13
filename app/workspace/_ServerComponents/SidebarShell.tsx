import prisma from "@/app/_DatabaseConfiguration/dbConfig";
import SidebarClient from "../_WorkspaceComponents/SidebarClient";

export default async function SidebarShell(){
    const workspaces = await prisma.workSpaceSection.findMany({
        where:{isDeleted:false},
        orderBy:{workspacename:"asc"}
    })

    return <SidebarClient sideBarClientWorkSpaceProps={workspaces}/>


}