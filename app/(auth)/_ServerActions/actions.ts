"use server"

import {auth} from "@/lib/auth"

export async function login(formData:FormData){
    const email = formData.get("email") as string
    const password = formData.get("password") as string;

    const result = await auth.api.signInEmail({
        body:{
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