# ❓ Preguntas Frecuentes (FAQ)

## Tabla de Contenidos

- [General](#general)
- [Instalación y Configuración](#instalación-y-configuración)
- [Desarrollo](#desarrollo)
- [Base de Datos](#base-de-datos)
- [Autenticación](#autenticación)
- [Uploads](#uploads)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## General

### ¿Qué es TerraLink?

TerraLink es una aplicación web moderna similar a Linktree que permite a los usuarios crear una página personalizada con todos sus enlaces importantes en un solo lugar. Está construida con Next.js 16, React 19, TypeScript, Prisma, y PostgreSQL.

### ¿Es TerraLink gratuito y open source?

Sí, TerraLink está bajo la licencia MIT, lo que significa que es completamente gratuito y open source. Puedes usarlo, modificarlo y distribuirlo libremente.

### ¿Para quién es este proyecto?

- **Usuarios finales**: Personas que quieren una alternativa a Linktree
- **Desarrolladores**: Que quieren aprender Next.js, Prisma, y tecnologías modernas
- **Estudiantes**: Como proyecto de portfolio o aprendizaje
- **Empresas**: Como base para un producto SaaS

### ¿Cuáles son las principales características?

- ✅ Autenticación segura con Clerk
- ✅ Flujo de onboarding multi-step (4 pasos)
- ✅ Selección de plataformas sociales
- ✅ Upload de imágenes de perfil
- ✅ Gestión de enlaces (en desarrollo)
- ✅ UI moderna y responsive
- ✅ Type-safe con TypeScript

---

## Instalación y Configuración

### ¿Qué necesito para ejecutar TerraLink localmente?

- Node.js v18 o superior
- Un gestor de paquetes (npm, yarn, o pnpm)
- PostgreSQL (local o en la nube)
- Cuentas gratuitas en Clerk y UploadThing

Para una guía detallada, consulta [GETTING_STARTED.md](GETTING_STARTED.md).

### ¿Puedo usar otra base de datos en lugar de PostgreSQL?

Técnicamente sí, ya que Prisma soporta múltiples bases de datos (MySQL, SQLite, SQL Server, MongoDB). Sin embargo, el proyecto está optimizado para PostgreSQL y usamos el adaptador específico `@prisma/adapter-pg`. Cambiar de base de datos requeriría:

1. Modificar el `datasource db` en `prisma/schema.prisma`
2. Ajustar el adaptador en `lib/db.ts`
3. Probar todas las funcionalidades

### ¿Necesito saber TypeScript para contribuir?

No necesitas ser un experto, pero conocimientos básicos de TypeScript ayudan. El proyecto está configurado para proporcionar excelente autocompletado y detección de errores, lo que hace más fácil aprender.

Si vienes de JavaScript, TypeScript es muy similar con types añadidos. Recursos:
- [TypeScript para JavaScript Developers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

### ¿Por qué hay un archivo `proxy.ts` en la raíz?

`proxy.ts` actúa como el middleware de Clerk. En Next.js, normalmente usarías `middleware.ts`, pero para evitar conflictos o por convención del proyecto, se nombró `proxy.ts`. Este archivo:
- Protege rutas privadas
- Permite rutas públicas específicas
- Maneja la autenticación en cada request

---

## Desarrollo

### ¿Cómo ejecuto el proyecto en modo desarrollo?

```bash
npm run dev
```

La aplicación estará en [http://localhost:3000](http://localhost:3000).

### ¿Cómo agrego un nuevo componente UI (shadcn/ui)?

```bash
npx shadcn@latest add [component-name]
```

Por ejemplo:
```bash
npx shadcn@latest add badge
npx shadcn@latest add card
```

Esto creará el componente en `components/ui/` listo para usar.

### ¿Dónde debo poner mis componentes personalizados?

- **Componentes específicos de página**: `components/home/`, `components/dashboard/`, etc.
- **Componentes reutilizables**: `components/shared/`
- **Componentes UI base**: `components/ui/` (reservado para shadcn/ui)

### ¿Cómo manejo el estado global?

El proyecto usa React Context API para estado global (ver `context/StepConfigUser`). Para nuevo estado global:

1. Crea un nuevo contexto en `context/`
2. Crea un custom hook para consumirlo
3. Provee el contexto en el nivel apropiado

Para estado local simple, usa `useState` directamente.

### ¿Debo usar Server Components o Client Components?

**Regla general:**
- **Server Components** (por defecto): Para componentes que no necesitan interactividad
- **Client Components** (`"use client"`): Para componentes con hooks, event handlers, o interactividad

**Ejemplos:**
```typescript
// Server Component - Sin interactividad
export function UserProfile({ user }: Props) {
  return <div>{user.name}</div>;
}

// Client Component - Con interactividad
"use client"
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## Base de Datos

### ¿Cómo agrego un nuevo campo al modelo User?

1. **Edita `prisma/schema.prisma`**:
   ```prisma
   model User {
     // ... campos existentes
     phoneNumber String?  // Nuevo campo
   }
   ```

2. **Crea una migración**:
   ```bash
   npx prisma migrate dev --name add_phone_number
   ```

3. **Regenera el cliente**:
   ```bash
   npx prisma generate
   ```

4. **Usa el nuevo campo en tu código**:
   ```typescript
   const user = await prisma.user.update({
     where: { id: userId },
     data: { phoneNumber: '+1234567890' }
   });
   ```

### ¿Qué es Prisma Studio y cómo lo uso?

Prisma Studio es una GUI para explorar tu base de datos. Para abrirlo:

```bash
npx prisma studio
```

Se abrirá en [http://localhost:5555](http://localhost:5555). Puedes:
- Ver todos tus registros
- Crear nuevos registros
- Editar datos existentes
- Borrar registros

### ¿Cómo reseteo mi base de datos?

```bash
# Borra la base de datos y vuelve a crear todo
npx prisma migrate reset

# Reaplica todas las migraciones
npx prisma migrate dev
```

**⚠️ Advertencia:** Esto borrará TODOS los datos.

### ¿Por qué el cliente de Prisma se genera en `lib/generated/prisma/`?

Por defecto, Prisma genera el cliente en `node_modules/@prisma/client`. Configuramos una ubicación custom (`lib/generated/prisma/`) para:
- Mejor control de versiones
- Autocompletado más visible
- Evitar regeneración constante en hot reload

Esto se configura en `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}
```

---

## Autenticación

### ¿Por qué usar Clerk en lugar de NextAuth?

**Clerk pros:**
- UI pre-construida y lista para producción
- Gestión de usuarios completa (no solo autenticación)
- Soporte para múltiples proveedores OAuth sin configuración compleja
- Features premium: 2FA, organizaciones, webhooks

**NextAuth pros:**
- Más control y customización
- Self-hosted
- Gratuito sin límites

Elegimos Clerk por simplicidad y features ready-to-go, pero puedes cambiarlo a NextAuth si prefieres.

### ¿Cómo protejo una nueva ruta?

Las rutas están protegidas automáticamente por el middleware en `proxy.ts`. Por defecto, todas las rutas requieren autenticación excepto:
- `/sign-in`
- `/sign-up`
- `/api/uploadthing`

Para hacer pública una nueva ruta:
```typescript
// En proxy.ts
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/uploadthing(.*)',
  '/tu-nueva-ruta-publica(.*)',  // Agregar aquí
]);
```

### ¿Cómo obtengo información del usuario autenticado?

**En Server Component:**
```typescript
import { currentUser } from '@clerk/nextjs/server';

export default async function Page() {
  const user = await currentUser();
  return <div>{user?.firstName}</div>;
}
```

**En Client Component:**
```typescript
"use client"
import { useUser } from '@clerk/nextjs';

export function MyComponent() {
  const { user } = useUser();
  return <div>{user?.firstName}</div>;
}
```

---

## Uploads

### ¿Por qué UploadThing y no otro servicio?

UploadThing es específicamente diseñado para Next.js con:
- Integración sencilla
- Type-safety
- Free tier generoso
- Serverless-friendly

Alternativas: Cloudinary, AWS S3, Vercel Blob.

### ¿Cómo cambio el límite de tamaño de archivo?

En `app/api/uploadthing/core.ts`:
```typescript
profileImage: f({ image: { maxFileSize: '8MB' } })  // Cambiar aquí
```

### ¿Puedo subir otros tipos de archivos además de imágenes?

Sí, edita el endpoint en `app/api/uploadthing/core.ts`:
```typescript
export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: '4MB' } }),
  documents: f({ pdf: { maxFileSize: '10MB' } }),  // Nuevo
  videos: f({ video: { maxFileSize: '50MB' } }),   // Nuevo
} satisfies FileRouter;
```

### ¿Dónde se almacenan las imágenes subidas?

En los servidores de UploadThing (basados en S3). Recibes una URL pública que guardas en tu base de datos.

---

## Deployment

### ¿Dónde puedo deployar TerraLink?

Opciones recomendadas:

1. **Vercel** (Recomendado para Next.js)
   - Deploy automático desde GitHub
   - Edge functions
   - Free tier generoso

2. **Railway**
   - Incluye PostgreSQL
   - Fácil setup
   - Affordable pricing

3. **Render**
   - Free tier para web services
   - Incluye PostgreSQL

4. **DigitalOcean App Platform**
   - Control total
   - PostgreSQL managed

### ¿Cómo deploy a Vercel?

1. **Push a GitHub**:
   ```bash
   git push origin main
   ```

2. **Conecta con Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - "New Project" → Import tu repo
   - Configura variables de entorno
   - Deploy

3. **Variables de entorno en Vercel**:
   - Settings → Environment Variables
   - Agrega todas las vars de `.env`

### ¿Mi base de datos debe estar en el mismo servicio?

No necesariamente. Puedes:
- **App en Vercel** + **DB en Neon** (Recomendado)
- **App en Railway** + **DB en Railway** (Todo en uno)
- **App en Vercel** + **DB en Supabase**

Lo importante es que la connection string esté en las variables de entorno.

### ¿Necesito hacer algo especial con Prisma en producción?

Sí, asegúrate de:

1. **Generar el cliente en build**:
   ```json
   // package.json
   {
     "scripts": {
       "build": "prisma generate && next build"
     }
   }
   ```

2. **Ejecutar migraciones**:
   ```bash
   npx prisma migrate deploy
   ```

3. **No incluir dev dependencies** en producción.

---

## Troubleshooting

### Error: "Cannot find module '@prisma/client'"

**Solución:**
```bash
npx prisma generate
```

### Error: "Clerk is not configured"

**Posibles causas:**
- Variables de entorno incorrectas
- `.env` no está en la raíz
- Servidor no reiniciado después de cambiar `.env`

**Solución:**
1. Verifica `.env`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
2. Reinicia el servidor: `Ctrl+C` → `npm run dev`

### Error: "UploadButton no carga"

**Causas comunes:**
- Variables de UploadThing incorrectas
- Ruta `/api/uploadthing` no pública en middleware
- Network issues

**Solución:**
1. Verifica `.env`:
   ```env
   UPLOADTHING_SECRET=sk_live_...
   UPLOADTHING_APP_ID=...
   ```
2. Verifica `proxy.ts` incluye `/api/uploadthing`
3. Revisa la consola del navegador

### El hot reload no funciona

**Soluciones:**
1. Reinicia el servidor
2. Limpia `.next`: `rm -rf .next`
3. Reinstala dependencias: `rm -rf node_modules && npm install`

### "Port 3000 is already in use"

**Solución:**
```bash
# Windows
npx kill-port 3000

# Mac/Linux
lsof -ti:3000 | xargs kill

# O usa otro puerto
npm run dev -- -p 3001
```

### Prisma Studio no abre

**Posibles causas:**
- Puerto 5555 ocupado
- Connection string incorrecta

**Solución:**
```bash
# Usa otro puerto
npx prisma studio -p 5556

# Verifica connection string
npx prisma validate
```

---

## ¿Más Preguntas?

Si tu pregunta no está aquí:

1. 📖 Consulta la [documentación completa](README.md)
2. 🔍 Busca en [GitHub Issues](https://github.com/tu-usuario/terra-link/issues)
3. 💬 Pregunta en [GitHub Discussions](https://github.com/tu-usuario/terra-link/discussions)
4. 📧 Contacta al equipo: [email@example.com]

---

<div align="center">

**[⬅️ Volver al README](README.md)** | **[Ver Guía de Inicio ➡️](GETTING_STARTED.md)**

**Última actualización:** Febrero 2026

</div>
