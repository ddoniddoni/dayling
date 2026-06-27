import { redirect } from "next/navigation";

import { Card } from "@/components/ui/card";
import { LoginForm } from "@/features/auth/auth-form";
import { getCurrentUserId, getPostLoginPath } from "@/lib/auth";

export default async function LoginPage() {
  const userId = await getCurrentUserId();

  if (userId) {
    redirect(await getPostLoginPath(userId));
  }

  return (
    <main className="safe-screen mx-auto flex w-full max-w-md flex-col bg-[#FFF8F0] px-5 py-6">
      <section className="flex flex-1 flex-col justify-center gap-7">
        <div className="grid justify-items-center gap-4 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-[#FFD6A5] shadow-[0_12px_30px_rgba(255,214,165,0.28)]">
            <div className="h-16 w-14 rounded-[50%] bg-gradient-to-b from-[#FFD9E1] to-[#FF9FB2]" />
          </div>
          <h1 className="text-3xl font-black leading-tight text-[#3A2E2E]">
            다시 만나서 반가워요!
          </h1>
          <p className="text-sm leading-6 text-[#8F7D7D]">
            오늘도 친구가 조용히 기다리고 있어요.
          </p>
        </div>

        <Card className="p-5">
          <LoginForm />
        </Card>
      </section>
    </main>
  );
}
