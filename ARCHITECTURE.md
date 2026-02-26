# 🏗️ Arquitectura de TerraLink

Este documento describe la arquitectura técnica de TerraLink, incluyendo el flujo de datos, componentes principales, y decisiones de diseño.

---

## 📐 Visión General de la Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Browser)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │   React UI   │  │  Clerk Auth  │  │  UploadThing UI    │   │
│  │  Components  │  │  Components  │  │  (UploadButton)     │   │
│  └──────┬───────┘  └──────┬───────┘  └─────────┬──────────┘   │
│         │                 │                     │               │
└─────────┼─────────────────┼─────────────────────┼───────────────┘
          │                 │                     │
          │                 │                     │
┌─────────▼─────────────────▼─────────────────────▼───────────────┐
│                    NEXT.JS APP ROUTER                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Server Components                       │  │
│  │  • app/(routes)/(home)/page.tsx                           │  │
│  │  • app/(auth)/sign-in/page.tsx                            │  │
│  │  • app/layout.tsx                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Client Components                       │  │
│  │  • components/home/HandlerSteps.tsx                       │  │
│  │  • components/home/StepOne-Four.tsx                       │  │
│  │  • components/shared/AdminSidebar                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      API Routes                            │  │
│  │  • /api/info-user     → GET/POST user info                │  │
│  │  • /api/user          → CRUD operations                   │  │
│  │  • /api/uploadthing   → File upload handler               │  │
│  └─────────┬──────────────────────────────────┬──────────────┘  │
│            │                                  │                  │
└────────────┼──────────────────────────────────┼──────────────────┘
             │                                  │
             │                                  │
   ┌─────────▼──────────┐           ┌──────────▼──────────┐
   │   Prisma Client    │           │   UploadThing API   │
   │   (ORM Layer)      │           │   (External)        │
   └─────────┬──────────┘           └─────────────────────┘
             │
             │
   ┌─────────▼──────────┐
   │   PostgreSQL DB    │
   │   • users table    │
   │   • links table    │
   └────────────────────┘
```

---

## 🔄 Flujo de Datos Completo

### 1. Autenticación (Sign Up)

```
┌──────────┐         ┌───────────┐         ┌──────────┐         ┌──────────┐
│  User    │         │   Clerk   │         │  Next.js │         │   API    │
│  Browser │         │   (Auth)  │         │  Server  │         │  Route   │
└────┬─────┘         └─────┬─────┘         └────┬─────┘         └────┬─────┘
     │                     │                     │                     │
     │ 1. Click Sign Up    │                     │                     │
     ├────────────────────>│                     │                     │
     │                     │                     │                     │
     │ 2. Show Sign Up Form│                     │                     │
     │<────────────────────┤                     │                     │
     │                     │                     │                     │
     │ 3. Submit Form      │                     │                     │
     ├────────────────────>│                     │                     │
     │                     │                     │                     │
     │                     │ 4. Verify & Create User                   │
     │                     ├────────────────────>│                     │
     │                     │                     │                     │
     │                     │                     │ 5. Create DB User   │
     │                     │                     ├────────────────────>│
     │                     │                     │                     │
     │                     │                     │ 6. User Created     │
     │                     │                     │<────────────────────┤
     │                     │                     │                     │
     │                     │ 7. Session Cookie   │                     │
     │                     │<────────────────────┤                     │
     │                     │                     │                     │
     │ 8. Redirect to /    │                     │                     │
     │<────────────────────┤                     │                     │
     │                     │                     │                     │
```

### 2. Flujo Multi-Step (Primera Visita)

```
┌──────────────────────────────────────────────────────────────────┐
│                       HandlerSteps Component                     │
│                    (Context: StepConfigUserProvider)             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 1: StepOne                                                 │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ • User selects "Purpose" (Personal, Business, etc.)    │     │
│  │ • Data stored in context: infoUser.typeUser            │     │
│  │ • Click Continue → nextStep()                           │     │
│  └────────────────────────────────────────────────────────┘     │
│                           │                                      │
│                           ▼                                      │
│  Step 2: StepTwo                                                 │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ • User selects social platforms (multi-select)         │     │
│  │ • Instagram, Twitter, YouTube, TikTok, LinkedIn, etc.  │     │
│  │ • Data stored in context: infoUser.platforms           │     │
│  │ • Click Continue → nextStep()                           │     │
│  └────────────────────────────────────────────────────────┘     │
│                           │                                      │
│                           ▼                                      │
│  Step 3: StepTree                                                │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ • User ingresa enlaces a sus plataformas seleccionadas    │     │
│  │ • Input field para cada plataforma                        │     │
│  │ • Data stored in context: infoUser.platforms with links │     │
│  │ • Click Continue → nextStep()                           │     │
│  └────────────────────────────────────────────────────────┘     │
│                           │                                      │
│                           ▼                                      │
│  Step 4: StepFour                                                │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ • User selects/uploads avatar                          │     │
│  │   - Grid of predefined avatars                         │     │
│  │   - OR upload with UploadThing (max 4MB)              │     │
│  │ • Enter name and username                              │     │
│  │ • Data stored in context:                              │     │
│  │   - infoUser.avatarUrl                                 │     │
│  │   - infoUser.name                                      │     │
│  │   - infoUser.username                                  │     │
│  │ • Click Continue → nextStep()                           │     │
│  └────────────────────────────────────────────────────────┘     │
│                           │                                      │
│                           ▼                                      │
│  Step 5: Summary                                                 │
│  ┌────────────────────────────────────────────────────────┐     │
│  │ • Display all collected data for review                │     │
│  │ • Click Confirm → POST to /api/user                    │     │
│  │ • Update DB: firstLogin = false                        │     │
│  │ • Close modal → Show main dashboard                    │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 3. Upload de Imagen

```
┌──────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────┐
│  User    │    │ UploadButton │    │ UploadThing │    │   API    │
│  (Step4) │    │  Component   │    │     API     │    │  Route   │
└────┬─────┘    └──────┬───────┘    └──────┬──────┘    └────┬─────┘
     │                 │                    │                 │
     │ 1. Select File  │                    │                 │
     ├────────────────>│                    │                 │
     │                 │                    │                 │
     │                 │ 2. Upload Request  │                 │
     │                 ├───────────────────>│                 │
     │                 │                    │                 │
     │                 │                    │ 3. Upload File  │
     │                 │                    │ (S3/CDN)        │
     │                 │                    │                 │
     │                 │                    │ 4. Webhook     │
     │                 │                    ├────────────────>│
     │                 │                    │                 │
     │                 │                    │                 │
     │                 │ 5. onClientUpload  │                 │
     │                 │    Complete({      │                 │
     │                 │      ufsUrl: ...   │                 │
     │                 │    })              │                 │
     │                 │<───────────────────┤                 │
     │                 │                    │                 │
     │ 6. toast.success│                    │                 │
     │    + set state  │                    │                 │
     │<────────────────┤                    │                 │
     │                 │                    │                 │
```

---

## 🗃️ Estructura de Base de Datos

### Diagrama ER (Entity-Relationship)

```
┌──────────────────────────────────────┐
│             User                     │
├──────────────────────────────────────┤
│ PK  id: UUID                         │
│ UQ  email: String?                   │
│     name: String?                    │
│     bio: String?                     │
│ UQ  username: String?                │
│     avatarUrl: String?               │
│     firstLogin: Boolean (default: T) │
│     typeUser: String?                │
│     backgroundImage: String?         │
│     createdAt: DateTime              │
│     updatedAt: DateTime              │
└─────────────┬────────────────────────┘
              │
              │ 1
              │
              │
              │ N
              │
┌─────────────▼────────────────────────┐
│             Link                     │
├──────────────────────────────────────┤
│ PK  id: UUID                         │
│     name: String?                    │
│     icon: String?                    │
│     link: String?                    │
│ FK  userId: UUID                     │
│     createdAt: DateTime              │
│     updatedAt: DateTime              │
└──────────────────────────────────────┘
```

### Queries Principales

```typescript
// 1. Get User con sus Links
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: { links: true }
});

// 2. Update User (First Login)
await prisma.user.update({
  where: { id: userId },
  data: {
    name: 'John Doe',
    username: 'johndoe',
    avatarUrl: 'https://...',
    typeUser: 'personal',
    firstLogin: false
  }
});

// 3. Create Link
await prisma.link.create({
  data: {
    name: 'Twitter',
    icon: 'twitter',
    link: 'https://twitter.com/...',
    userId: userId
  }
});

// 4. Get All Links by User
const links = await prisma.link.findMany({
  where: { userId: userId },
  orderBy: { createdAt: 'desc' }
});
```

---

## 🔧 Patrones de Diseño Utilizados

### 1. Context API Pattern

**Ubicación:** `context/StepConfigUser/index.tsx`

**Propósito:** Compartir estado del flujo multi-step sin prop drilling.

```typescript
interface StepConfigContextType {
  step: number;
  totalSteps: number;
  infoUser: Partial<UserData>;
  nextStep: () => void;
  prevStep: () => void;
  setInfoUser: (data: Partial<UserData>) => void;
}

export function StepConfigUserProvider({ children }) {
  const [step, setStep] = useState(1);
  const [infoUser, setInfoUser] = useState({});

  // ... logic

  return (
    <StepConfigContext.Provider value={{ ... }}>
      {children}
    </StepConfigContext.Provider>
  );
}
```

### 2. Compound Component Pattern

**Ubicación:** `components/ui/*`

**Propósito:** Componentes que trabajan juntos (shadcn/ui pattern).

```typescript
<AlertDialog>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>...</AlertDialogTitle>
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>
```

### 3. Custom Hooks Pattern

**Ubicación:** `hooks/useStepConfig.ts`

**Propósito:** Encapsular lógica reutilizable relacionada con el estado.

```typescript
export function useStepConfig() {
  const context = useContext(StepConfigContext);

  if (!context) {
    throw new Error('useStepConfig must be used within StepConfigProvider');
  }

  return context;
}
```

### 4. Repository Pattern (Prisma)

**Ubicación:** `lib/db.ts`

**Propósito:** Singleton de Prisma para evitar múltiples instancias.

```typescript
import { PrismaClient } from './generated/prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### 5. Barrel Exports Pattern

**Ubicación:** `components/home/index.ts`, `data/index.ts`, etc.

**Propósito:** Simplificar imports agrupando exports.

```typescript
// components/home/index.ts
export { HandlerSteps } from './HandlerSteps';
export { StepOne } from './StepOne';
export { StepTwo } from './StepTwo';
export { StepTree } from './StepTree';
export { StepFour } from './StepFour';
export { Summary } from './Summary';

// Usage
import { HandlerSteps, StepOne, Summary } from '@/components/home';
```

---

## 🛡️ Middleware y Seguridad

### Clerk Middleware (proxy.ts)

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/uploadthing(.*)',  // ⚠️ IMPORTANTE: Debe ser público
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});
```

**⚠️ Nota Crítica:** La ruta `/api/uploadthing` DEBE ser pública para que los webhooks de UploadThing funcionen correctamente. Sin esto, el callback entra en un loop infinito.

---

## 🚀 Optimizaciones de Performance

### 1. Server Components por Defecto

Todos los componentes son Server Components a menos que se especifique `"use client"`. Esto reduce el bundle de JavaScript enviado al cliente.

### 2. Lazy Loading de Imágenes

```typescript
import Image from 'next/image';

<Image
  src={avatarUrl}
  alt="Avatar"
  width={100}
  height={100}
  loading="lazy"  // Lazy loading automático
/>
```

### 3. Prisma Client Singleton

Evita crear múltiples instancias de Prisma en desarrollo (hot reload).

### 4. Tailwind CSS JIT

Genera solo las clases CSS que se usan en el proyecto.

---

## 📦 Dependencias Clave

### Production

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `next` | 16.1.6 | Framework React con SSR/SSG |
| `react` | 19.2.3 | Biblioteca UI |
| `@clerk/nextjs` | 6.37.4 | Autenticación |
| `@prisma/client` | 7.4.0 | ORM para PostgreSQL |
| `uploadthing` | 7.7.4 | Upload de archivos |
| `tailwindcss` | 4.x | Styling |

### Development

| Paquete | Propósito |
|---------|-----------|
| `typescript` | Type-safety |
| `eslint` | Linting |
| `prisma` | CLI de Prisma |
| `shadcn` | CLI de shadcn/ui |

---

## 🔄 Estado y Gestión de Datos

### Cliente (React State)

```
┌─────────────────────────────────────┐
│   StepConfigUserProvider (Context)  │
├─────────────────────────────────────┤
│ • step: number                      │
│ • infoUser: Partial<User>           │
│ • nextStep()                        │
│ • prevStep()                        │
│ • setInfoUser()                     │
└─────────────────────────────────────┘
           │
           │ consumed by
           ▼
┌─────────────────────────────────────┐
│    useStepConfig() hook             │
└─────────────────────────────────────┘
           │
           │ used in
           ▼
┌─────────────────────────────────────┐
│  StepOne, StepTwo, StepTree, etc.   │
└─────────────────────────────────────┘
```

### Servidor (Database)

```
┌──────────────┐
│  API Routes  │
└──────┬───────┘
       │
       │ use
       ▼
┌──────────────┐
│ Prisma Client│
└──────┬───────┘
       │
       │ queries
       ▼
┌──────────────┐
│  PostgreSQL  │
└──────────────┘
```

---

## 🧪 Testing Strategy (Future)

### Niveles de Testing Propuestos

1. **Unit Tests**
   - Funciones de utilidad (`lib/utils.ts`)
   - Custom hooks (`hooks/useStepConfig.ts`)
   - Componentes UI aislados

2. **Integration Tests**
   - Flujo multi-step completo
   - API routes con database mocks
   - Upload de archivos

3. **E2E Tests**
   - Flujo completo de sign up → onboarding → dashboard
   - Cypress o Playwright

### Herramientas Sugeridas

- **Jest** + **React Testing Library** (Unit + Integration)
- **Cypress** o **Playwright** (E2E)
- **MSW** (Mock Service Worker para API mocking)

---

## 📊 Métricas y Monitoreo (Future)

### Sugerencias de Implementación

1. **Vercel Analytics** - Métricas de performance automáticas
2. **Sentry** - Error tracking y monitoring
3. **PostHog** - Product analytics
4. **Prisma Metrics** - Database query performance

---

## 🔮 Roadmap Técnico

### Fase 1 (Actual) ✅
- [x] Autenticación con Clerk
- [x] Flujo multi-step de onboarding
- [x] Upload de imágenes con UploadThing
- [x] CRUD básico de usuarios y links
- [x] UI responsive con Tailwind

### Fase 2 (Próxima)
- [ ] Gestión completa de links (CRUD)
- [ ] Perfil público del usuario
- [ ] Temas de color personalizados
- [ ] Drag & drop para reordenar links
- [ ] Analytics básicos (clicks en links)

### Fase 3 (Futuro)
- [ ] Link scheduling (programar activación/desactivación)
- [ ] Custom domains
- [ ] QR code generator
- [ ] Integración con redes sociales
- [ ] A/B testing de links

---

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [UploadThing Documentation](https://docs.uploadthing.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Última actualización:** Febrero 2026
