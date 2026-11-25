/**
 * Punto de extensión para Better Auth.
 * Reemplazar MockAuthService cuando la base de datos esté lista.
 */
export const BETTER_AUTH_BASE_PATH = "/api/auth";

export function isBetterAuthEnabled(): boolean {
  return process.env.AUTH_MODE === "better-auth";
}