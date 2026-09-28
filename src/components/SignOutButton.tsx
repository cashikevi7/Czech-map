"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
    >
      Odhlásit se
    </button>
  );
}
