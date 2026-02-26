# 🚀 Guía de Inicio Rápido - TerraLink

Esta guía te ayudará a configurar y ejecutar TerraLink en tu máquina local en menos de 10 minutos.

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- ✅ **Node.js** (v18 o superior) → [Descargar](https://nodejs.org/)
- ✅ **npm**, **yarn**, o **pnpm**
- ✅ **Git** → [Descargar](https://git-scm.com/)
- ✅ **PostgreSQL** (local o cuenta en servicio cloud)

### Verificar Instalaciones

```bash
node --version    # Debe ser v18+
npm --version     # Cualquier versión reciente
git --version     # Cualquier versión reciente
```

---

## 🎯 Paso 1: Clonar el Repositorio

```bash
# Clonar el proyecto
git clone https://github.com/Errold146/TerraLink.git

# Entrar al directorio
cd terra-link
```

---

## 📦 Paso 2: Instalar Dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

⏱️ **Tiempo estimado:** 2-3 minutos

---

## 🗄️ Paso 3: Configurar Base de Datos

### Opción A: PostgreSQL Local

1. **Instalar PostgreSQL**:
   - Windows: [PostgreSQL Installer](https://www.postgresql.org/download/windows/)
   - Mac: `brew install postgresql`
   - Linux: `sudo apt install postgresql`

2. **Crear base de datos**:
   ```bash
   # Entrar a psql
   psql -U postgres

   # Crear la base de datos
   CREATE DATABASE terralink;

   # Salir
   \q
   ```

3. **URL de conexión**:
   ```
   postgresql://postgres:tu_password@localhost:5432/terralink
   ```

### Opción B: PostgreSQL Cloud (Recomendado para principiantes)

#### Neon (Gratis, Fácil)

1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta
3. Crea un nuevo proyecto
4. Copia la connection string (empieza con `postgresql://`)

#### Supabase (Gratis, Con extras)

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta y un proyecto
3. Ve a Settings → Database
4. Copia la "Connection string" en modo "Transaction"

---

## 🔐 Paso 4: Configurar Clerk (Autenticación)

1. **Crear cuenta**: Ve a [clerk.com](https://clerk.com) y regístrate
2. **Crear aplicación**:
   - Click en "Add application"
   - Nombre: "TerraLink"
   - Elige métodos de autenticación (Email, Google, etc.)
3. **Copiar API Keys**:
   - En el dashboard, ve a "API Keys"
   - Copia el **Publishable key** (empieza con `pk_test_`)
   - Copia el **Secret key** (empieza con `sk_test_`)

---

## 📤 Paso 5: Configurar UploadThing (Uploads)

1. **Crear cuenta**: Ve a [uploadthing.com](https://uploadthing.com) y regístrate
2. **Crear app**:
   - Click en "New App"
   - Nombre: "TerraLink"
3. **Copiar credenciales**:
   - En el dashboard, ve a "API Keys"
   - Copia el **Secret** (empieza con `sk_live_`)
   - Copia el **App ID**

---

## 🌍 Paso 6: Configurar Variables de Entorno

1. **Copiar el archivo de ejemplo**:
   ```bash
   cp .env.example .env
   ```

2. **Editar `.env`** con tus credenciales:
   ```env
   # Reemplaza con tu connection string de PostgreSQL
   DATABASE_URL="postgresql://usuario:password@host:5432/database"

   # Reemplaza con tus keys de Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
   CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

   # Mantén estos valores
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Reemplaza con tus keys de UploadThing
   UPLOADTHING_SECRET=sk_live_xxxxxxxxxxxxx
   UPLOADTHING_APP_ID=xxxxxxxxxxxxx

   # Mantén este valor para desarrollo
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Guardar el archivo**

---

## 🔨 Paso 7: Generar Cliente de Prisma y Migrar DB

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear las tablas en la base de datos
npx prisma migrate dev --name init

# (Opcional) Abrir Prisma Studio para ver la DB
npx prisma studio
```

⏱️ **Tiempo estimado:** 1 minuto

---

## 🎉 Paso 8: Ejecutar la Aplicación

```bash
npm run dev
```

🚀 **La aplicación estará disponible en:** [http://localhost:3000](http://localhost:3000)

---

## ✅ Verificar que Todo Funciona

### 1. Página Principal
- Abre [http://localhost:3000](http://localhost:3000)
- Deberías ver la página de inicio

### 2. Autenticación
- Click en "Sign Up" o navega a [http://localhost:3000/sign-up](http://localhost:3000/sign-up)
- Completa el formulario de registro
- Deberías ser redirigido a la página principal

### 3. Flujo de Onboarding
- Como usuario nuevo, deberías ver un modal con el flujo multi-step
- **Step 1**: Selecciona tu tipo de usuario (Personal, Negocio, Creador de Contenido, etc.)
- **Step 2**: Selecciona tus plataformas sociales (Instagram, Twitter, YouTube, etc.)
- **Step 3**: Ingresa los enlaces o usernames de cada plataforma seleccionada
- **Step 4**: Sube/selecciona una imagen y completa tu perfil (nombre y username)
- **Step 5**: Revisa y confirma

### 4. Dashboard
- Después del onboarding, deberías ver el dashboard principal
- Verifica que tu información se guardó correctamente

---

## 🐛 Resolución de Problemas Comunes

### Error: "Cannot find module '@prisma/client'"

**Solución:**
```bash
npx prisma generate
```

### Error: "Database connection failed"

**Posibles causas:**
1. La URL de conexión en `.env` es incorrecta
2. PostgreSQL no está corriendo (si es local)
3. Firewall bloqueando la conexión

**Solución:**
- Verifica la URL en `.env`
- Si es local: `sudo service postgresql start` (Linux) o verifica que el servicio esté activo
- Prueba la conexión: `npx prisma studio`

### Error: "Clerk is not configured"

**Solución:**
- Verifica que las keys de Clerk en `.env` sean correctas
- Asegúrate de que el archivo `.env` esté en la raíz del proyecto
- Reinicia el servidor de desarrollo (`Ctrl+C` y luego `npm run dev`)

### Error: "UploadThing callback loop"

**Solución:**
- Verifica que `/api/uploadthing` esté en las rutas públicas de Clerk
- Esto ya debería estar configurado en `proxy.ts`

### El servidor no inicia

**Solución:**
```bash
# Mata cualquier proceso en el puerto 3000
# Windows
npx kill-port 3000

# Mac/Linux
lsof -ti:3000 | xargs kill

# Luego inicia de nuevo
npm run dev
```

### Cambios en `.env` no se reflejan

**Solución:**
- Siempre reinicia el servidor después de cambiar `.env`
- Algunas variables requieren reconstruir: `npm run build`

---

## 📚 Próximos Pasos

### Para Desarrolladores

1. **Lee la documentación**:
   - [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitectura del proyecto
   - [CONTRIBUTING.md](CONTRIBUTING.md) - Guía de contribución

2. **Explora el código**:
   - `app/(routes)/(home)/page.tsx` - Página principal
   - `components/home/` - Componentes del flujo de onboarding
   - `app/api/` - API Routes

3. **Experimenta**:
   - Modifica componentes y ve los cambios en tiempo real
   - Agrega nuevos campos al schema de Prisma
   - Crea nuevos componentes UI

### Para Usuarios

1. **Personaliza tu perfil**:
   - Agrega tu nombre y username únicos
   - Sube tu foto de perfil
   - Selecciona tu tema preferido

2. **Gestiona tus enlaces** (próximamente):
   - Agrega tus redes sociales
   - Organiza tus enlaces
   - Comparte tu página de perfil

---

## 🆘 ¿Necesitas Ayuda?

- 📖 [Documentación completa](README.md)
- 💬 [Discusiones en GitHub](https://github.com/tu-usuario/terra-link/discussions)
- 🐛 [Reportar un bug](https://github.com/tu-usuario/terra-link/issues/new?template=bug_report.md)
- ✨ [Solicitar una feature](https://github.com/tu-usuario/terra-link/issues/new?template=feature_request.md)

---

## 📊 Checklist de Setup

Usa este checklist para asegurarte de que todo está configurado:

- [ ] Node.js v18+ instalado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm install`)
- [ ] PostgreSQL configurado (local o cloud)
- [ ] Cuenta de Clerk creada
- [ ] Cuenta de UploadThing creada
- [ ] Archivo `.env` configurado con todas las variables
- [ ] Prisma client generado (`npx prisma generate`)
- [ ] Migraciones ejecutadas (`npx prisma migrate dev`)
- [ ] Servidor de desarrollo corriendo (`npm run dev`)
- [ ] Sign up exitoso
- [ ] Onboarding completado
- [ ] Dashboard visible

---

## 🎓 Recursos de Aprendizaje

Si eres nuevo en alguna de las tecnologías usadas:

- **Next.js**: [Tutorial oficial](https://nextjs.org/learn)
- **React 19**: [Documentación](https://react.dev)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Prisma**: [Getting Started](https://www.prisma.io/docs/getting-started)
- **Tailwind CSS**: [Tutorial](https://tailwindcss.com/docs)
- **Clerk**: [Documentation](https://clerk.com/docs)

---

**¡Felicidades! 🎉 Ahora tienes TerraLink corriendo localmente.**

Si tienes algún problema, no dudes en abrir un issue o consultar la documentación.

---

<div align="center">

**[⬅️ Volver al README](README.md)** | **[Ver Arquitectura ➡️](ARCHITECTURE.md)**

Made with ❤️ by the TerraLink team

</div>
