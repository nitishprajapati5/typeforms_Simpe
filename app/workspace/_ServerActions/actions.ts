"use server"

import { getSession } from "@/app/_ClientComponents/UtiltiyFunction";
import { withAuth } from "@/app/_ClientComponents/withAuth";
import prisma from "@/app/_DatabaseConfiguration/dbConfig";
import { revalidatePath } from "next/cache";

export const getAllWorkSpaceData = withAuth(async (userData,FormData) => {

    const data = await prisma.workSpaceSection.findMany()

    return {
        success:true,
        message:"Data Added Successfully",
        data:data
    }
})

export const createWorkSpace = withAuth(async (user,formData) => {
    const workSpaceName = formData.get("workspacename") as string
    if(!workSpaceName){
        return {
            success:false,
            message:"Workspace name is required"
        }
    }

    await prisma.workSpaceSection.create({
        data:{
            workspacename:workSpaceName,
            userId:user.id
        }
    })

    revalidatePath("/workspace/home")

    return {
        success:true,
        message:"WorkSpace created"
    }
})

export const editWorkSpaceName = withAuth(async (usePresenceData,formData) => {
    const workSpaceName = formData.get("workSpaceName") as string
    const workSpaceId = formData.get("workspaceId") as string

    const user = await getSession()
    
    console.log(workSpaceName)
    console.log("Workspace Id",workSpaceId)


   try {
     await prisma.workSpaceSection.update({
        where:{
            id:workSpaceId,
            userId:user?.id
        },
        data:{
            workspacename:workSpaceName
        }
    })

    if(!workSpaceName){
        return {
            success:false,
            message:"Workspace name is required"
        }
    }

    revalidatePath(`/workspace/home/${workSpaceId}`)
    revalidatePath("/workspace/home")

    return {
        success:true,
        message:"Workspace Name Updated Success fully"
    }
   } catch (error) {
        return {
            success:false,
            message:"Something went wrong"
        }
   }
})