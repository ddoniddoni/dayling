import { redirect } from "next/navigation";

import { EggSelectView } from "@/features/hatch/egg-select-view";
import { getCurrentUserId, getPostLoginPath } from "@/lib/auth";

export default async function EggPage() {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect("/login");
  }

  if ((await getPostLoginPath(userId)) === "/home") {
    redirect("/home");
  }

  return <EggSelectView />;
}
