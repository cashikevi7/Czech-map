import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MapClient from "@/components/MapClient";

export const dynamic = "force-dynamic";

export default async function MapPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return <MapClient />;
}
