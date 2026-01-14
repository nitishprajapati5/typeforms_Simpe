
import prisma from "@/app/_DatabaseConfiguration/dbConfig";
import HomeClient from "./HomeClient";
import { getSession } from "@/app/_ClientComponents/UtiltiyFunction";
import { redirect } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({params}:PageProps){
    const user = await getSession()
    const {id} = await params

    if(!user){
        redirect("/login")
    }

    console.log(id)

    const workspace = await prisma.workSpaceSection.findFirst({
        where:{
            id:id,
            userId:user?.id
        }
    })

    console.log("WorkSpace",workspace)

    if(!workspace){
        return <div>WorkSpace not Found!</div>
    }

    return (
        <HomeClient 
            workspaceId={id}
            initialWorkSpaceName={workspace.workspacename}
        />
    )
}