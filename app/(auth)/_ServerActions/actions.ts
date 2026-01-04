"use server"

import {auth} from "@/lib/auth"
import { redirect } from "next/navigation"

type LoginState = {
    error?:string,
    success:boolean
}

export async function login(prevState:LoginState,formData:FormData):Promise<LoginState>{
    const email = formData.get("email") as string
    const password = formData.get("password") as string;


    console.log("Email",email,"Password",password)

    const result = await auth.api.signInEmail({
        body:{
            email:email,
            password:password,
            callbackURL:"/workspace/home"
        },
        asResponse:true
    })

    if(!email || !password){
        return {
            success:false,
            error:"Email and Password are required"
        }
    }

    if(!result.ok){
        const {error} = await result.json();
        //return {success:false,error:error?.message || "Login failed"}
         redirect("/workspace/home")

    }

    redirect("/workspace/home")
}

export async function signup(formData:FormData){
    const email = formData.get("email") as string
    const password = formData.get("password") as string;
    const username = formData.get("username") as string

    const result = await auth.api.signUpEmail({
        body:{
            name:username,
            email:email,
            password:password,
            callbackURL:"/workspace/home"
        },
        asResponse:true
    })

    if(!result.ok){
        const {error} = await result.json();
        return {error:error?.message || "Login failed"}
    }
}