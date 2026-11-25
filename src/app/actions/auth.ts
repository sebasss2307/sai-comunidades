"use server";

import { redirect } from "next/navigation";

import { getAuthService } from "@/auth/services/mock-auth-service";
import type { LoginFormValues, RegisterFormValues } from "@/lib/schemas/auth";
import { loginSchema, registerSchema } from "@/lib/schemas/auth";

export type AuthActionState = {
  error?: string;
};

export async function loginAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const raw: LoginFormValues = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const auth = getAuthService();
  const session = await auth.login(parsed.data.email, parsed.data.password);
  if (!session) {
    return { error: "Credenciales incorrectas" };
  }

  const next = String(formData.get("next") ?? "/foro");
  redirect(next.startsWith("/") ? next : "/foro");
}

export async function registerAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const raw: RegisterFormValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  try {
    const auth = getAuthService();
    await auth.register({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo registrar";
    return { error: message };
  }

  redirect("/foro");
}

export async function logoutAction(): Promise<void> {
  const auth = getAuthService();
  await auth.logout();
  redirect("/");
}

export async function demoRoleAction(formData: FormData): Promise<void> {
  const role = String(formData.get("role") ?? "guest") as
    | "guest"
    | "user"
    | "admin";
  const auth = getAuthService();
  await auth.impersonateDemo(role);
  if (role === "admin") redirect("/admin");
  if (role === "user") redirect("/foro");
  redirect("/");
}