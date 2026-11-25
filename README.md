# SAI Comunidades

Landing y plataforma comunitaria en **Next.js (App Router) + TypeScript + Tailwind**.

## Funcionalidades (MOCK)

- Sitio público (`/`)
- Registro (`/registro`) e inicio de sesión (`/iniciar-sesion`)
- Foro protegido (`/foro`) para usuarios registrados
- Contacto (`/contacto`)
- Panel admin (`/admin`) solo rol `admin`

## Arquitectura

| Capa | Ubicación |
|------|-----------|
| UI | `src/ui`, `src/app` |
| Dominio | `src/domain` |
| Datos mock | `src/data/mock` |
| Repositorios | `src/repositories` |
| Autenticación | `src/auth` (MOCK → Better Auth) |

Variables: ver `.env.example`.

## Probar roles (desarrollo)

Flotante **Demo MOCK** (esquina inferior derecha):

- **Visitante** — sin sesión
- **Miembro** — `miembro@demo.com`
- **Admin** — `admin@demo.com`

Contraseña demo: `demo1234`

## Comandos

```bash
npm run dev
npm run build
npm run lint
```

## Próximos pasos

1. Integrar **Better Auth** (`src/auth/better-auth/`)
2. Implementar repositorios **Supabase** (`DATA_PROVIDER=supabase`)
3. Ajustar diseño visual según mockups finales