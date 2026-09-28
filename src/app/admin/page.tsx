import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ThemeToggle from "@/components/ThemeToggle";
import SignOutButton from "@/components/SignOutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/map");
  }

  const [total, admins, npcs] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { role: "NPC" } }),
  ]);

  const stats = [
    { label: "Všichni uživatelé", value: total },
    { label: "ADMIN účty", value: admins },
    { label: "NPC účty", value: npcs },
  ];

  return (
    <main className="min-h-dvh p-6">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">OpenMind — Administrace</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {stat.label}
            </p>
            <p className="mt-2 text-4xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
