/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { JWTPayload } from "better-auth";

const JWT_SECRET = process.env.JWT_TOKEN!;

export type ApiResponse<T = null> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
};

export const ApiResponse = {
  success<T>(data?: T, message = "Success"): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  },

  error(message = "Something went wrong", errors?: any): ApiResponse<null> {
    return {
      success: false,
      message,
      errors,
    };
  },
};

export type ActionSuccess<T = null> = {
  success: true;
  data?: T;
  message: string;
};

export type ActionError = {
  success: false;
  message: string;
  fieldErrors?: Record<string, string>;
};

export type ActionResponse<T = null> = ActionSuccess<T> | ActionError;

export function jsonWebTokenGeneration(id: string, name: string) {
  return jwt.sign({ id, name }, process.env.JWT_TOKEN as string, {
    expiresIn: "1d",
  });
}

export async function generateHashedPassword(
  password: string
): Promise<string> {
  return bcrypt.hash(password, 10);
}

export interface SessionUser {
  id: string;
  email: string;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  console.log(token)

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload & SessionUser;


    


    if (!decoded.exp) {
      return null;
    }

    const isExpired = Date.now() >= decoded.exp * 1000;

    if (isExpired) {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
}
