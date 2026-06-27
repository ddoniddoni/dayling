import { redirect } from "next/navigation";

import { getCurrentUserId, getPostLoginPath } from "@/lib/auth";

export default async function RootPage() {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect("/login");
  }

  redirect(await getPostLoginPath(userId));
}
