import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="safe-screen mx-auto grid h-dvh w-full max-w-md grid-rows-[15fr_70fr_15fr] bg-[#fff8fb]">
      <section className="px-5 py-4">
        <Card className="h-full p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-black text-zinc-950">몽실이 Lv. 1</h1>
              <p className="text-sm text-zinc-500">EXP 0 / 100</p>
            </div>
            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-600">
              COMMON
            </span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-pink-100">
            <div className="h-full w-0 rounded-full bg-pink-500" />
          </div>
        </Card>
      </section>

      <section className="flex items-center justify-center px-5">
        <div className="flex h-full w-full items-center justify-center rounded-[8px] bg-white/70">
          <div className="relative h-48 w-40">
            <div className="absolute left-1/2 top-10 h-32 w-32 -translate-x-1/2 rounded-full bg-pink-200 shadow-xl" />
            <div className="absolute left-12 top-20 h-4 w-4 rounded-full bg-zinc-950" />
            <div className="absolute right-12 top-20 h-4 w-4 rounded-full bg-zinc-950" />
            <div className="absolute bottom-8 left-1/2 h-10 w-24 -translate-x-1/2 rounded-full bg-pink-300" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-2 px-5 py-4">
        <Button type="button" className="px-2 text-sm">
          밥
        </Button>
        <Button type="button" className="px-2 text-sm">
          물
        </Button>
        <Button type="button" className="px-2 text-sm">
          쓰담
        </Button>
        <Button type="button" variant="secondary" className="px-2 text-sm">
          일기
        </Button>
      </section>
    </main>
  );
}

