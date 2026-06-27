import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CHARACTER_CATALOG } from "@/lib/characters";

export default function Home() {
  return (
    <main className="safe-screen mx-auto flex w-full max-w-md flex-col bg-[#fff8fb] px-5 py-6">
      <section className="flex flex-1 flex-col justify-between gap-6">
        <div className="space-y-4">
          <p className="text-sm font-bold text-pink-500">Dayling</p>
          <h1 className="text-4xl font-black leading-tight text-zinc-950">
            알에서 깨어나는 작은 친구들
          </h1>
          <p className="text-base leading-7 text-zinc-600">
            일기를 쓰고 밥과 물을 챙기며 3D 캐릭터를 키우는 모바일 WebView 앱입니다.
          </p>
        </div>

        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-950">초기 캐릭터</h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              확률 합계 100%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            {CHARACTER_CATALOG.slice(0, 6).map((character) => (
              <div
                key={character.id}
                className="rounded-[8px] bg-pink-50 px-2 py-3 text-zinc-700"
              >
                <div className="font-bold">{character.name}</div>
                <div className="text-xs text-zinc-500">{character.rarity}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-3">
          <Button type="button">MVP 시작하기</Button>
          <Link
            href="/onboarding/egg"
            className="min-h-12 rounded-2xl bg-white px-5 py-3 text-center text-base font-bold text-zinc-800 shadow-lg shadow-pink-100 transition active:scale-[0.98]"
          >
            알 선택 화면 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
