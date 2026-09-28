"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return "Zadejte platný e-mail a heslo.";
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/map",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Nesprávný e-mail nebo heslo.";
    }
    throw error;
  }
}
