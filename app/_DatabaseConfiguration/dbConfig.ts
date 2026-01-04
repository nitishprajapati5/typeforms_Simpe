import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma : PrismaClient}

export const prisma = globalForPrisma.prisma || new PrismaClient({
    log:['error','query','warn','info'],
    accelerateUrl:process.env.PRISMA_ACCELERATE_URL!
})

if(process.env.NODE_ENV !== 'production'){
    globalForPrisma.prisma = prisma
}

export default prisma