import { redirect } from "next/navigation";

import { HomeView } from "@/features/home/home-view";
import { getCurrentUserId } from "@/lib/auth";

export default async function HomePage() {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect("/login");
  }

  return <HomeView />;
}
