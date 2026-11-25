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
npm run build:github-pages   # export estático en ./out (GitHub Pages)
```

## Publicar en GitHub Pages

El repo incluye el workflow [`.github/workflows/github-pages.yml`](.github/workflows/github-pages.yml): hace build estático de Next y publica la carpeta `out` con GitHub Actions.

1. Subí el proyecto a GitHub (rama `main`).
2. En el repo: **Settings → Pages → Build and deployment → Source** → **GitHub Actions**.
3. Push a `main` (o ejecutá el workflow **GitHub Pages** en **Actions → Run workflow**).
4. Al terminar el job, la URL queda en **Settings → Pages** y en el entorno `github-pages`.

URL de proyecto (nombre del repo = segmento de ruta):

`https://<tu-usuario>.github.io/<nombre-del-repo>/`

El workflow define `NEXT_PUBLIC_BASE_PATH=/<nombre-del-repo>` automáticamente. En el sitio estático los formularios no guardan datos (stubs); el dev local con `npm run dev` sigue usando Server Actions y mock en memoria.

Detalle del build, límites y sitio de usuario (`usuario.github.io`): [`.github/GITHUB_PAGES.md`](.github/GITHUB_PAGES.md).

## Próximos pasos

1. Integrar **Better Auth** (`src/auth/better-auth/`)
2. Implementar repositorios **Supabase** (`DATA_PROVIDER=supabase`)
3. Ajustar diseño visual según mockups finales