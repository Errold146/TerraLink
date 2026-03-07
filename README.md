<div align="center">

# 🌴 TerraLink

### _Your personal link hub - All your important links in one beautiful place_

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.4.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)

</div>

---

## 📖 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura de Datos](#-arquitectura-de-datos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Flujo de Usuario](#-flujo-de-usuario)
- [API Endpoints](#-api-endpoints)
- [Contribuir](#-contribuir)

---

## 🎯 Sobre el Proyecto

**TerraLink** es una aplicación moderna de gestión de enlaces estilo Linktree, construida con las últimas tecnologías web. Permite a los usuarios crear su página personal de enlaces, personalizar su perfil, y compartir todos sus enlaces importantes en un solo lugar.

### ¿Por qué TerraLink?

- 🎨 **Personalización Total**: Elige tu tipo de usuario, plataformas sociales, y personaliza tu perfil
- 🔐 **Autenticación Segura**: Integración con Clerk para sign-in/sign-up sin fricciones
- 📱 **Responsive Design**: Optimizado para móviles, tablets y desktop
- ⚡ **Performance**: Construido con Next.js 16 y React 19 para máxima velocidad
- 🎭 **Multi-Step Onboarding**: Flujo de configuración intuitivo en 4 pasos

---

## ✨ Características Principales

### 🚀 Para Usuarios

- **Configuración Guiada**: Proceso de onboarding en 4 pasos
  - Paso 1: Selecciona tu tipo de usuario (Personal, Negocio, Creador de Contenido, etc.)
  - Paso 2: Elige tus plataformas/redes sociales
  - Paso 3: Ingresa los enlaces o usernames de tus plataformas
  - Paso 4: Sube tu foto de perfil y completa tu información (nombre y username)

- **Gestión de Enlaces**: Crea, edita y organiza tus enlaces
  - Lista de enlaces interactiva con iconos de plataformas sociales
  - Enlaces que abren en nueva pestaña (`target="_blank"`)
  - Efectos hover sutiles y transiciones suaves
  - Soporte para múltiples plataformas (Instagram, YouTube, GitHub, etc.)

- **Preview de Teléfono**: Vista previa en tiempo real estilo smartphone
  - Diseño realista de teléfono con notch y bordes redondeados
  - Botones de navegación estilo Android (atrás, home, recientes)
  - Fondo personalizable con gradientes y overlays
  - Scrollable content con todos tus enlaces
  - Logo de TerraLink en la parte inferior

- **Perfil Personalizado**: Avatares predefinidos o carga tu propia imagen
- **Dashboard Admin**: Sidebar administrativo para gestionar tu contenido

### 🔧 Para Desarrolladores

- **TypeScript First**: Type-safety en todo el proyecto
- **App Router**: Utiliza el nuevo App Router de Next.js 16
- **Prisma ORM**: Gestión de base de datos type-safe
- **Server Components**: Optimización de performance con RSC
- **API Routes**: Endpoint REST para operaciones del servidor

---

## 🛠️ Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Next.js** | 16.1.6 | Framework React con SSR/SSG |
| **React** | 19.2.3 | Biblioteca UI con Server Components |
| **TypeScript** | 5.x | Type-safety y mejor DX |
| **Tailwind CSS** | 4.x | Styling utility-first |
| **shadcn/ui** | 3.8.4 | Componentes UI accesibles |
| **Lucide React** | 0.564.0 | Iconos modernos |
| **React Icons** | 5.5.0 | Biblioteca de iconos adicional |

### Backend & Database

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Prisma** | 7.4.0 | ORM type-safe para PostgreSQL |
| **PostgreSQL** | - | Base de datos relacional |
| **@prisma/adapter-pg** | 7.4.0 | Adaptador nativo para PostgreSQL |

### Autenticación & Uploads

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Clerk** | 6.37.4 | Autenticación y gestión de usuarios |
| **UploadThing** | 7.7.4 | Subida de archivos/imágenes |

### UI/UX Libraries

| Tecnología | Propósito |
|-----------|-----------|
| **Sonner** | Toast notifications elegantes |
| **class-variance-authority** | Gestión de variantes de componentes |
| **clsx & tailwind-merge** | Utilidades para clases CSS |
| **Radix UI** | Primitivas accesibles para componentes |

---

## 📁 Estructura del Proyecto

```
terra-link/
│
├── 📂 app/                          # Next.js App Router
│   ├── 📂 (auth)/                   # Grupo de rutas de autenticación
│   │   ├── layout.tsx               # Layout específico de auth
│   │   ├── sign-in/[[...sign-in]]/  # Página de inicio de sesión (Clerk)
│   │   └── sign-up/[[...sign-up]]/  # Página de registro (Clerk)
│   │
│   ├── 📂 (routes)/                 # Grupo de rutas principales
│   │   └── (home)/                  # Ruta home con layout
│   │       ├── layout.tsx           # Layout del home
│   │       └── page.tsx             # ✨ Página principal con flujo multi-step
│   │
│   ├── 📂 api/                      # API Routes
│   │   ├── info-user/route.ts       # GET/POST info del usuario
│   │   ├── user/route.ts            # Operaciones CRUD de usuario
│   │   └── uploadthing/             # Endpoints de UploadThing
│   │       ├── core.ts              # 🔧 Configuración de uploads
│   │       └── route.ts             # Handler de ruta
│   │
│   ├── globals.css                  # Estilos globales + Tailwind
│   └── layout.tsx                   # 🎨 Root layout (Toaster, Providers)
│
├── 📂 components/                   # Componentes React
│   ├── 📂 home/                     # Componentes específicos del home
│   │   ├── HandlerSteps.tsx         # 🎯 Controlador del flujo multi-step
│   │   ├── StepOne.tsx              # Paso 1: Selección de tipo de usuario
│   │   ├── StepTwo.tsx              # Paso 2: Selección de plataformas sociales
│   │   ├── StepTree.tsx             # Paso 3: Enlaces a plataformas
│   │   ├── StepFour.tsx             # Paso 4: Avatar, nombre y username
│   │   ├── Summary.tsx              # Resumen y confirmación final
│   │   ├── LinkProfile.tsx          # Perfil de enlaces del usuario
│   │   ├── LinkListItem.tsx         # 🔗 Item de link para lista principal
│   │   └── index.ts                 # Barrel export
│   │
│   ├── 📂 profile/                  # Componentes de perfil
│   │   ├── ProfileInfo.tsx          # Información del perfil
│   │   ├── ProfileImage.tsx         # Imagen de perfil
│   │   └── index.ts                 # Barrel export
│   │
│   ├── 📂 ProfilePreview/           # Componentes de preview mobile
│   │   ├── PhonoPreview.tsx         # 📱 Preview de teléfono completo
│   │   ├── PhoneLinkItem.tsx        # 🔗 Item de link estilo móvil
│   │   ├── PhoneProfileHeader.tsx   # Encabezado del perfil móvil
│   │   ├── ProfilePreview.tsx       # Contenedor de preview
│   │   └── index.ts                 # Barrel export
│   │
│   ├── 📂 shared/                   # Componentes compartidos
│   │   ├── AdminSidebar/            # Sidebar de administración
│   │   ├── Heading/                 # Componente de encabezado
│   │   ├── Logo/                    # Logo de la aplicación
│   │   ├── Spinner/                 # Loading spinner
│   │   └── index.ts                 # Barrel export
│   │
│   └── 📂 ui/                       # Componentes UI (shadcn/ui)
│       ├── alert-dialog.tsx         # Modal para steps
│       ├── avatar.tsx               # Componente de avatar
│       ├── button.tsx               # Botón personalizable
│       ├── dropdown-menu.tsx        # Menú desplegable
│       ├── input.tsx                # Input fields
│       ├── progress.tsx             # Barra de progreso
│       ├── separator.tsx            # Línea separadora
│       ├── sheet.tsx                # Panel lateral
│       ├── sidebar.tsx              # Componente sidebar
│       ├── skeleton.tsx             # Loading skeleton
│       └── tooltip.tsx              # Tooltips
│
├── 📂 context/                      # React Context
│   ├── StepConfigUser/              # Context para configuración multi-step
│   │   └── index.tsx                # 🗂️ Provider con estado global de steps
│   └── index.ts                     # Barrel export
│
├── 📂 data/                         # Datos estáticos
│   ├── StepOne.data.ts              # Opciones de tipo de usuario
│   ├── StepTwo.data.ts              # Plataformas sociales disponibles
│   ├── StepFour.data.ts             # Avatares predefinidos
│   └── index.ts                     # Barrel export
│
├── 📂 hooks/                        # Custom React Hooks
│   ├── use-mobile.ts                # Hook para detección mobile
│   └── useStepConfig.ts             # 🎣 Hook para gestión de steps
│
├── 📂 lib/                          # Librerías y utilidades
│   ├── db.ts                        # 🔌 Conexión a PostgreSQL (Prisma)
│   ├── utils.ts                     # Funciones de utilidad
│   └── generated/prisma/            # 🤖 Cliente Prisma generado
│       ├── client.ts                # Cliente Prisma
│       ├── models/                  # Tipos TypeScript de modelos
│       │   ├── User.ts              # Tipo User
│       │   └── Link.ts              # Tipo Link
│       └── ...                      # Otros archivos generados
│
├── 📂 prisma/                       # Configuración de Prisma
│   └── schema.prisma                # 📊 Schema de base de datos
│
├── 📂 utils/                        # Utilidades generales
│   └── uploadthing.ts               # 📤 Cliente de UploadThing
│
├── 📂 types/                        # TypeScript types globales
│   └── index.ts                     # Definiciones de tipos
│
├── 📄 proxy.ts                      # 🛡️ Middleware de Clerk
├── 📄 prisma.config.ts              # Configuración de Prisma
├── 📄 next.config.ts                # Configuración de Next.js
├── 📄 tailwind.config.ts            # Configuración de Tailwind
├── 📄 tsconfig.json                 # Configuración de TypeScript
├── 📄 components.json               # Configuración de shadcn/ui
└── 📄 package.json                  # Dependencias del proyecto
```

### 🔍 Descripción de Carpetas Principales

#### `app/` - Next.js App Router
Utiliza el patrón de App Router con grupos de rutas:
- **(auth)**: Rutas de autenticación, usa el layout de Clerk
- **(routes)**: Rutas principales de la aplicación
- **api/**: Endpoints REST para operaciones del servidor

#### `components/` - Componentes React
- **home/**: Componentes específicos del flujo de onboarding
- **shared/**: Componentes reutilizables en toda la app
- **ui/**: Componentes de shadcn/ui (primitivas de Radix UI)

#### `context/` - Estado Global
Context API para gestionar el estado del flujo multi-step sin prop drilling.

#### `lib/` - Lógica de Negocio
- **db.ts**: Singleton de Prisma Client
- **generated/**: Cliente Prisma con type-safety completo

---

## 🗄️ Arquitectura de Datos

### Modelos de Prisma

```prisma
model User {
    id              String   @id @default(uuid())
    email           String?  @unique
    name            String?
    bio             String?
    username        String?  @unique
    avatarUrl       String?
    firstLogin      Boolean  @default(true)
    typeUser        String?  @db.Text
    backgroundImage String?
    createdAt       DateTime @default(now())
    updatedAt       DateTime @updatedAt

    links Link[]  // Relación 1:N con Link
}

model Link {
    id        String   @id @default(uuid())
    name      String?
    icon      String?
    link      String?
    userId    String
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt

    user User @relation(fields: [userId], references: [id])
}
```

### Diagrama de Relaciones

```
┌─────────────────────────────────┐
│           User                  │
├─────────────────────────────────┤
│ • id (PK, UUID)                 │
│ • email (Unique)                │
│ • name                          │
│ • bio                           │
│ • username (Unique)             │
│ • avatarUrl                     │
│ • firstLogin (Boolean)          │
│ • typeUser                      │
│ • backgroundImage               │
│ • createdAt                     │
│ • updatedAt                     │
└─────────────────┬───────────────┘
                  │
                  │ 1:N
                  │
         ┌────────▼────────────────┐
         │        Link             │
         ├─────────────────────────┤
         │ • id (PK, UUID)         │
         │ • name                  │
         │ • icon                  │
         │ • link                  │
         │ • userId (FK)           │
         │ • createdAt             │
         │ • updatedAt             │
         └─────────────────────────┘
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js**: >= 18.x
- **npm/yarn/pnpm**: Gestor de paquetes
- **PostgreSQL**: Base de datos (local o remota)
- **Cuenta de Clerk**: Para autenticación ([clerk.com](https://clerk.com))
- **Cuenta de UploadThing**: Para uploads ([uploadthing.com](https://uploadthing.com))

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Errold146/TerraLink.git
   cd terra-link
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto:
   ```bash
   cp .env.example .env
   ```

   Luego edita `.env` con tus credenciales (ver sección siguiente).

4. **Configurar la base de datos**
   ```bash
   # Generar el cliente Prisma
   npx prisma generate

   # Ejecutar migraciones
   npx prisma migrate dev --name init

   # (Opcional) Abrir Prisma Studio para ver la BD
   npx prisma studio
   ```

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 🔐 Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://usuario:password@localhost:5432/terralink"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# UploadThing
UPLOADTHING_SECRET=sk_live_xxxxxxxxxxxxx
UPLOADTHING_APP_ID=xxxxxxxxxxxxx

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Obtener Credenciales

1. **PostgreSQL**:
   - Local: Instala PostgreSQL y crea una base de datos
   - Remoto: Usa servicios como [Neon](https://neon.tech), [Supabase](https://supabase.com), o [Railway](https://railway.app)

2. **Clerk**:
   - Regístrate en [clerk.com](https://clerk.com)
   - Crea una nueva aplicación
   - Copia las API keys desde el dashboard

3. **UploadThing**:
   - Regístrate en [uploadthing.com](https://uploadthing.com)
   - Crea un nuevo proyecto
   - Copia el secret y app ID

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en localhost:3000

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint para verificar código

# Prisma
npx prisma generate  # Genera el cliente Prisma
npx prisma migrate dev  # Ejecuta migraciones en desarrollo
npx prisma studio    # Abre Prisma Studio (GUI de BD)
npx prisma db push   # Sincroniza schema sin migraciones
```

---

## 🎨 Flujo de Usuario

### 1️⃣ Primera Visita (Onboarding)

Cuando un usuario se registra por primera vez, se activa el flujo multi-step:

```
┌──────────────┐
│   Sign Up    │
│   (Clerk)    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────────────┐
│          Flujo Multi-Step (4 Pasos)              │
├──────────────────────────────────────────────────┤
│                                                  │
│  Step 1: [Selecciona tu Tipo de Usuario]       │
│  ├─ Personal                                     │
│  ├─ Negocio                                      │
│  ├─ Creador de Contenido                        │
│  └─ Otro...                                      │
│          │                                       │
│          ▼                                       │
│  Step 2: [Selecciona tus Plataformas Sociales]  │
│  ├─ Instagram  ├─ Twitter/X  ├─ Facebook       │
│  ├─ YouTube    ├─ TikTok     ├─ LinkedIn       │
│  └─ [Múltiples opciones]                        │
│          │                                       │
│          ▼                                       │
│  Step 3: [Ingresa los Links a tus Plataformas]  │
│  ├─ Campo para cada plataforma seleccionada     │
│  ├─ Ejemplo: @usuario o URL completa            │
│  └─ Todos los campos son requeridos             │
│          │                                       │
│          ▼                                       │
│  Step 4: [Perfil Personal]                      │
│  ├─ Selecciona avatar predefinido               │
│  ├─ O sube tu propia foto (max 4MB)            │
│  ├─ Ingresa tu nombre                           │
│  └─ Elige tu username único                     │
│          │                                       │
│          ▼                                       │
│  Step 5: [Resumen y Confirmación]               │
│  └─ Revisa y guarda toda la configuración      │
│                                                  │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │   Dashboard     │
         │   Principal     │
         └─────────────────┘
```

### 2️⃣ Usuarios Recurrentes

```
┌──────────────┐
│   Sign In    │
│   (Clerk)    │
└──────┬───────┘
       │
       ▼
┌─────────────────┐
│   Dashboard     │
│   Principal     │
├─────────────────┤
│ • Ver Links     │
│ • Agregar Links │
│ • Editar Perfil │
│ • Sidebar Admin │
└─────────────────┘
```

---

## 🔌 API Endpoints

### User Endpoints

#### `GET /api/info-user`
Obtiene información completa del usuario actual (incluye links).

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "username": "johndoe",
  "avatarUrl": "https://...",
  "firstLogin": false,
  "typeUser": "personal",
  "links": [
    {
      "id": "uuid",
      "name": "Twitter",
      "icon": "twitter",
      "link": "https://twitter.com/johndoe"
    }
  ]
}
```

#### `POST /api/user`
Actualiza la información del usuario.

**Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "avatarUrl": "https://...",
  "typeUser": "personal"
}
```

### UploadThing Endpoints

#### `POST /api/uploadthing`
Endpoint público para subir imágenes de perfil.

**Configuración:**
- Tamaño máximo: 4MB
- Formatos: image/png, image/jpeg, image/jpg, image/gif
- Límite: 1 archivo por request

---

## 🧪 Testing & Debug

### Prisma Studio
Para inspeccionar la base de datos visualmente:
```bash
npx prisma studio
```

### Logs de Desarrollo
El proyecto incluye logs detallados en:
- `console.log` para debugging
- `toast.success` / `toast.error` para feedback de usuario

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar TerraLink:

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Guías de Contribución

- Sigue las convenciones de código existentes
- Usa TypeScript para type-safety
- Documenta nuevas funcionalidades
- Prueba tu código antes de hacer PR

---

## 📝 Notas Técnicas Importantes

### Clerk Middleware (proxy.ts)
El archivo `proxy.ts` en la raíz actúa como middleware de Clerk. Es crucial que la ruta `/api/uploadthing` esté en `isPublicRoute` para evitar loops infinitos en callbacks de uploads.

### UploadThing
- Usa `ufsUrl` en lugar del deprecado `url`
- `onUploadComplete` en `core.ts` debe retornar data para que el callback del cliente funcione
- La ruta debe ser pública en Clerk middleware

### Prisma Generated Client
El cliente se genera en `lib/generated/prisma/` (no en `node_modules`). Esto permite mejor control de versiones y autocomplete.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🙏 Agradecimientos

- **Next.js Team** por el increíble framework
- **Clerk** por la autenticación sin complicaciones
- **Prisma** por el ORM type-safe
- **shadcn/ui** por los componentes accesibles
- **Vercel** por el hosting y optimizaciones

---

<div align="center">

### ⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub

**Hecho con ❤️ por desarrolladores, para desarrolladores**

## ✉️ Contacto

[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin)](https://linkedin.com/in/errold-núñez-sánchez)
[![Email](https://img.shields.io/badge/Email-ErroldNúñezS-D14836?logo=gmail)](mailto:errold222@gmail.com)

[🐛 Reportar Bug](https://github.com/tu-usuario/terra-link/issues) • [✨ Solicitar Feature](https://github.com/tu-usuario/terra-link/issues) • [💬 Discusiones](https://github.com/tu-usuario/terra-link/discussions)

</div>
