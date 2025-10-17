export const dynamic = "force-dynamic";

import { loadProfile } from "@/lib/content";
import { Hero } from "@/components/hero";

export default async function Home() {
  const profile = await loadProfile();
  return <Hero profile={profile} />;
}
