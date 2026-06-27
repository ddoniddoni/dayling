import { redirect } from "next/navigation";

import { HomeView } from "@/features/home/home-view";
import { getMainCharacter } from "@/features/character/character.server";
import { getCurrentUserId } from "@/lib/auth";

export default async function HomePage() {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect("/login");
  }

  const character = await getMainCharacter(userId);

  if (!character) {
    redirect("/onboarding/egg");
  }

  return <HomeView initialCharacter={character} />;
}
