import {betterAuth} from "better-auth"
import {prismaAdapter} from "better-auth/adapters/prisma"
import prisma from "../app/_DatabaseConfiguration/dbConfig"


export const auth = betterAuth({
    database:prismaAdapter(prisma,{
        provider:"mongodb"
    }),
    emailAndPassword:{
        enabled:true
    },
    socialProviders:{
        google:{
            clientId:"",
            clientSecret:""
        }
    },
    session:{
        expiresIn:60*60*24*1
    }
    
})