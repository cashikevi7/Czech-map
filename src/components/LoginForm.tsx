"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/login/actions";

export default function LoginForm() {
  const [error, formAction, pending] = useActionState(authenticate, undefined);

  return (
    <form
      action={formAction}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium"
        >
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium"
        >
          Heslo
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Přihlašuji…" : "Přihlásit se"}
      </button>
    </form>
  );
}
