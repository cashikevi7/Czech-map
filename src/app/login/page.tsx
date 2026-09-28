import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/map");
  }

  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">OpenMind</h1>
        <LoginForm />
      </div>
    </main>
  );
}
