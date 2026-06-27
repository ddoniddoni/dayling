import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { prisma } from "@/lib/prisma";
import type { AuthSession } from "@/features/auth/auth.types";

const SESSION_COOKIE_NAME = "dayling_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getSessionSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is required");
  }

  return new TextEncoder().encode(secret);
}

async function signSession(session: AuthSession) {
  return new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSessionSecret());
}

async function verifySessionToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());

    if (typeof payload.userId !== "string") {
      return null;
    }

    return { userId: payload.userId };
  } catch {
    return null;
  }
}

export async function createSession(userId: string) {
  const cookieStore = await cookies();
  const token = await signSession({ userId });

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = await verifySessionToken(token);
  return session?.userId ?? null;
}

export async function getCurrentUser() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      nickname: true,
    },
  });
}

export async function getPostLoginPath(userId: string) {
  const mainCharacter = await prisma.userCharacter.findFirst({
    where: {
      userId,
      isMain: true,
    },
    select: {
      id: true,
    },
  });

  return mainCharacter ? "/home" : "/onboarding/egg";
}
