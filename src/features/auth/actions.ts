"use server";

import { compare, hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

import type { AuthActionState } from "@/features/auth/auth.types";
import { clearSession, createSession, getPostLoginPath } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const signupSchema = z.object({
  nickname: z.string().trim().min(1, "닉네임을 입력해주세요.").max(20),
  email: z.string().trim().email("올바른 이메일을 입력해주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

const loginSchema = z.object({
  email: z.string().trim().email("올바른 이메일을 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function signupAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signupSchema.safeParse({
    nickname: getFormString(formData, "nickname"),
    email: getFormString(formData, "email").toLowerCase(),
    password: getFormString(formData, "password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "회원가입 정보를 확인해주세요." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true },
  });

  if (existingUser) {
    return { error: "이미 가입된 이메일입니다." };
  }

  const passwordHash = await hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      nickname: parsed.data.nickname,
      passwordHash,
    },
    select: {
      id: true,
    },
  });

  await createSession(user.id);
  redirect("/onboarding/egg");
}

export async function loginAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: getFormString(formData, "email").toLowerCase(),
    password: getFormString(formData, "password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "로그인 정보를 확인해주세요." };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: {
      id: true,
      passwordHash: true,
    },
  });

  if (!user) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  const isPasswordValid = await compare(parsed.data.password, user.passwordHash);

  if (!isPasswordValid) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  await createSession(user.id);
  redirect(await getPostLoginPath(user.id));
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
