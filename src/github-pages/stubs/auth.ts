import { STATIC_HOST_MESSAGE } from "@/github-pages/stubs/static-only";

export type AuthActionState = {
  error?: string;
};

export async function loginAction(
  _prev: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  return { error: STATIC_HOST_MESSAGE };
}

export async function registerAction(
  _prev: AuthActionState,
  _formData: FormData,
): Promise<AuthActionState> {
  return { error: STATIC_HOST_MESSAGE };
}

export async function logoutAction(): Promise<void> {}

export async function demoRoleAction(_formData: FormData): Promise<void> {}