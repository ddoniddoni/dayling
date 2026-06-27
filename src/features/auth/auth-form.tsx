"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { loginAction, signupAction } from "@/features/auth/actions";
import type { AuthActionState } from "@/features/auth/auth.types";

const initialState: AuthActionState = {};

function SubmitButton({ children }: { children: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="min-h-12 w-full rounded-[18px] bg-[#FF9FB2] px-5 py-3 text-base font-black text-white shadow-[0_10px_22px_rgba(255,159,178,0.28)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "잠시만요..." : children}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-[#3A2E2E]">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="min-h-[52px] rounded-[18px] border border-[#FFD6A5] bg-white px-4 text-base font-medium text-[#3A2E2E] outline-none transition placeholder:text-[#8F7D7D]/45 focus:border-[#FF9FB2] focus:ring-4 focus:ring-[#FF9FB2]/20"
      />
    </label>
  );
}

function AuthError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return (
    <p role="alert" className="rounded-[18px] bg-[#FFF0F3] px-4 py-3 text-sm font-black text-[#9A5361]">
      {error}
    </p>
  );
}

export function SignupForm() {
  const [state, formAction] = useActionState(signupAction, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <Field label="닉네임" name="nickname" autoComplete="nickname" />
      <Field label="이메일" name="email" type="email" autoComplete="email" />
      <Field label="비밀번호" name="password" type="password" autoComplete="new-password" />
      <AuthError error={state.error} />
      <SubmitButton>회원가입</SubmitButton>
      <Link href="/login" className="text-center text-sm font-black text-[#9A5361]">
        이미 계정이 있어요
      </Link>
    </form>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <Field label="이메일" name="email" type="email" autoComplete="email" />
      <Field label="비밀번호" name="password" type="password" autoComplete="current-password" />
      <AuthError error={state.error} />
      <SubmitButton>로그인</SubmitButton>
      <Link href="/signup" className="text-center text-sm font-black text-[#9A5361]">
        처음이라면 회원가입하기
      </Link>
    </form>
  );
}
