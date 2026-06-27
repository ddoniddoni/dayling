import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const eggs = [
  { id: "basic_egg_01", label: "분홍 알", className: "bg-pink-200" },
  { id: "basic_egg_02", label: "하늘 알", className: "bg-sky-200" },
  { id: "basic_egg_03", label: "민트 알", className: "bg-emerald-200" },
];

export default function EggPage() {
  return (
    <main className="safe-screen mx-auto flex w-full max-w-md flex-col bg-[#fff8fb] px-5 py-6">
      <section className="flex flex-1 flex-col gap-5">
        <div className="space-y-2">
          <p className="text-sm font-bold text-pink-500">첫 친구 만나기</p>
          <h1 className="text-3xl font-black text-zinc-950">
            마음에 드는 알을 골라주세요!
          </h1>
        </div>

        <div className="grid flex-1 content-center gap-4">
          {eggs.map((egg) => (
            <Card key={egg.id} className="flex items-center gap-4 p-4">
              <div
                className={`h-20 w-16 rounded-[50%] border-4 border-white shadow-inner ${egg.className}`}
              />
              <div className="flex-1">
                <h2 className="text-lg font-bold text-zinc-950">{egg.label}</h2>
                <p className="text-sm text-zinc-500">
                  MVP에서는 알 외형만 다르고 확률은 동일합니다.
                </p>
              </div>
              <Button type="button">선택</Button>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

