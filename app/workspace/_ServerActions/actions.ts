"use server"

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