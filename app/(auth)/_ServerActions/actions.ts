"use server";

import { jsonWebTokenGeneration,generateHashedPassword, ActionResponse } from "@/app/_ClientComponents/UtiltiyFunction";
import prisma from "@/app/_DatabaseConfiguration/dbConfig";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function login(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const token = jsonWebTokenGeneration(user.id, user.username);

  (await cookies()).set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/workspace/home");
}


export async function signup(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return {
      success: false,
      message: "Please enter email and password",
    };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  const hashedPassword = await generateHashedPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      username: email,
      password: hashedPassword,
    },
  });

  const token = jsonWebTokenGeneration(user.id, user.username);

  (await cookies()).set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/workspace/home");
}

