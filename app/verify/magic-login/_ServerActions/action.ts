"use server"
import { ActionResponse, jsonWebTokenGeneration } from "@/app/_ClientComponents/UtiltiyFunction";
import prisma from "@/app/_DatabaseConfiguration/dbConfig";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function verifyMagicLinkAction(prevState:ActionResponse,formData:FormData):Promise<ActionResponse>{
    const token = formData.get("token") as string
    const code = formData.get("code") as string

    if(!token){
        return {
            success:false,
            message:"Token is invalid"
        }
    };

    const user = await prisma.user.findFirst({
        where:{
            magicToken:token,
            magicExpiresAt:{gt:new Date()},
            code:code
        }
    });

    if(!user){
        return {
            success:false,
            message:"Link is invalid or expired."
        }
    }

    await prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            magicToken:null,
            magicExpiresAt:null,
            code:null
        }
    });

    const jwt = jsonWebTokenGeneration(user.id,user.email);

    (await cookies()).set("access_token",jwt,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        path:"/",
        maxAge:60 * 60 * 24
    })

    redirect("/workspace/home")
}