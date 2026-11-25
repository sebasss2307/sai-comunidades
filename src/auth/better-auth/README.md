# Better Auth (pendiente de integración)

La autenticación oficial del proyecto será **Better Auth**. Durante la fase MOCK
se usa `AUTH_MODE=mock`.

## Pasos futuros

1. Crear `src/auth/better-auth/auth.ts` con `betterAuth({ ... })` y adaptador a
   Postgres (Supabase).
2. Exponer rutas en `src/app/api/auth/[...all]/route.ts`.
3. Implementar `BetterAuthSessionProvider` en `src/auth/session-provider.ts`.
4. Cambiar `AUTH_MODE=better-auth` y retirar cookies mock.

Documentación: https://www.better-auth.com/docs/installation