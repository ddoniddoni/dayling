import { redirect } from "next/navigation";

import { Card } from "@/components/ui/card";
import { SignupForm } from "@/features/auth/auth-form";
import { getCurrentUserId, getPostLoginPath } from "@/lib/auth";

export default async function SignupPage() {
  const userId = await getCurrentUserId();

  if (userId) {
    redirect(await getPostLoginPath(userId));
  }

  return (
    <main className="safe-screen mx-auto flex w-full max-w-md flex-col bg-[#FFF8F0] px-5 py-6">
      <section className="flex flex-1 flex-col justify-center gap-7">
        <div className="grid justify-items-center gap-4 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-[#BDE0FE] shadow-[0_12px_30px_rgba(189,224,254,0.34)]">
            <div className="h-16 w-14 rounded-[50%] bg-gradient-to-b from-[#F3FFE9] to-[#CAFFBF]" />
          </div>
          <h1 className="text-3xl font-black leading-tight text-[#3A2E2E]">
            새로운 친구를 만나러 가볼까요?
          </h1>
          <p className="text-sm leading-6 text-[#8F7D7D]">
            작은 알에서 나만의 친구가 깨어나요.
          </p>
        </div>

        <Card className="p-5">
          <SignupForm />
        </Card>
      </section>
    </main>
  );
}
