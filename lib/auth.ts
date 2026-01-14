import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// import { PrismaClient } from "@prisma/client"
// import prisma from "../app/_DatabaseConfiguration/dbConfig"
import prisma from '@/app/_DatabaseConfiguration/dbConfig';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: '',
      clientSecret: '',
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 1,
  },
  trustedOrigins: ['http://localhost:3000'],
});
