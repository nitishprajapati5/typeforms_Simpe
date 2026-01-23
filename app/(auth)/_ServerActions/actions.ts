'use server';

import {
  jsonWebTokenGeneration,
  generateHashedPassword,
  ActionResponse,
} from '@/app/_ClientComponents/UtiltiyFunction';
import prisma from '@/app/_DatabaseConfiguration/dbConfig';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import crypto from 'crypto';
import { Resend } from 'resend';
import path from 'path';
import fs from 'fs';
import cryptoRandomString from 'crypto-random-string';

export async function login(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const isFormResponse = String(formData.get('isFormResponse') || '');
  const uuid = String(formData.get('uuid') || '');

  console.log('isFormResponse', isFormResponse);

  if (uuid === 'null') {
    return {
      success: false,
      message: 'Form is Invalid',
    };
  }

  if (!email || !password) {
    return {
      success: false,
      message: 'Email and password are required',
    };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }

  if (user.provider === 'GOOGLE') {
    return {
      success: false,
      message: 'This account uses Google Sign-In.Please login with Google.',
    };
  }

  const isValid = bcrypt.compare(password, user.password!);

  if (!isValid) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }

  const token = jsonWebTokenGeneration(user.id, user.username);

  (await cookies()).set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  if (isFormResponse === 'true') {
    redirect(`/response/${uuid}`);
  } else {
    redirect('/workspace/home');
  }
}

export async function signup(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return {
      success: false,
      message: 'Please enter email and password',
    };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  console.log(existingUser);
  if (existingUser) {
    if (existingUser.provider === 'GOOGLE') {
      return {
        success: false,
        message:
          'This email is already registered with Google. Please use Google Sign-In',
      };
    }

    return {
      success: false,
      message: 'User already exists',
    };
  }

  const hashedPassword = await generateHashedPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      username: email,
      password: hashedPassword,
      provider: 'CREDENTIALS',
    },
  });

  const token = jsonWebTokenGeneration(user.id, user.username);

  (await cookies()).set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  redirect('/workspace/home');
}

export async function magicLink(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const email = String(formData.get('email'));

  if (!email) {
    return {
      success: false,
      message: 'Please provider email.',
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return {
      success: false,
      message: 'No Account Found.',
    };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const code = cryptoRandomString({ length: 10, type: 'base64' });

  const user = await prisma.user.update({
    where: { email },
    data: {
      magicToken: token,
      magicExpiresAt: new Date(Date.now() + 1000 * 60 * 15),
      code: code,
    },
  });

  const resendApiKey = process.env.RESEND_API_KEY!;
  const resend = new Resend(resendApiKey);

  const templatePath = path.join(process.cwd(), 'emails', 'magic-link.html');

  let html = fs.readFileSync(templatePath, 'utf-8');

  html = html
    .replaceAll('{{TOKEN}}', token)
    .replaceAll('{{APP_URL}}', process.env.APP_URL!)
    .replaceAll('{{CODE}}', code);

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: user.email,
    subject: 'Your secure login link',
    html: html,
  });

  console.log('Secure login');

  return {
    success: true,
    message: 'We have send an e-mail to your inbox.',
  };
}
