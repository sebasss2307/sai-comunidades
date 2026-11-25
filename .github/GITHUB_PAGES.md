# GitHub Pages

Publicación estática del sitio con **GitHub Actions** (carpeta `out` de Next.js).

## Activar en el repositorio

1. En GitHub: **Settings → Pages → Build and deployment → Source**: elige **GitHub Actions**.
2. Sube estos archivos a `main` (workflow `.github/workflows/github-pages.yml`).
3. Tras el primer push, en **Actions** debe completarse el workflow **GitHub Pages**.

URL esperada (repositorio de proyecto):  
`https://<usuario>.github.io/<nombre-del-repo>/`

El workflow define `NEXT_PUBLIC_BASE_PATH=/<nombre-del-repo>`, alineado con `basePath` en `next.config.ts`.

### Sitio de usuario u organización

Si el repo se llama `<usuario>.github.io`, el sitio vive en la raíz del dominio. En el job `build` del workflow cambia:

```yaml
NEXT_PUBLIC_BASE_PATH: ""
```

y en `next.config.ts` no aplica prefijo cuando `basePath` queda vacío.

## Build local (prueba)

PowerShell:

```powershell
$env:GITHUB_PAGES = "true"
$env:NEXT_PUBLIC_BASE_PATH = "/sai-comunidades"   # igual que el nombre del repo
npm run build:github-pages
```

La salida queda en `./out`.

## Build estático (`npm run build:github-pages`)

Con `GITHUB_PAGES=true`:

1. `scripts/prepare-github-pages.mjs` respalda las Server Actions reales y sube **stubs** (solo lectura).
2. Deshabilita `middleware.ts` durante el build.
3. `next build` genera la carpeta `out/`.
4. `postbuild-github-pages.mjs` crea `.nojekyll` y **restaura** el código fuente local.

En el sitio publicado los **formularios no persisten datos** (mensaje de vista estática). Auth y middleware no aplican en hosting estático: navegación y contenido MOCK pregenerado sí.

Desarrollo normal (`npm run build` / `npm run dev`) no usa ese modo y conserva Server Actions y middleware.