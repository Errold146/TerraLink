# 📋 Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### ✨ Añadido
- **LinkListItem**: Nuevo componente para mostrar links en la página principal
  - Diseño más grande y legible que el preview del teléfono
  - Muestra nombre e URL completa del link
  - Abre links en nueva pestaña con `target="_blank"`
  - Transiciones suaves y hover effects sutiles
  - Iconos de plataformas sociales integrados
  - Soporte para dark mode

### 🔄 Cambiado
- **PhoneLinkItem**: Convertido de botón con clipboard a enlace directo
  - Ahora usa elemento `<a>` en lugar de `<button>`
  - Abre links en nueva pestaña con `target="_blank"` y `rel="noopener noreferrer"`
  - Removida funcionalidad de copiar al portapapeles
  - Optimizado para el preview del teléfono (diseño compacto)

- **PhonoPreview**: Mejorado el diseño de los botones de navegación
  - Botones de navegación estilo Android en la parte inferior
  - Agrupados en barra semi-transparente con backdrop blur
  - Iconos: triángulo (atrás), círculo (home), cuadrado (recientes)
  - Posicionamiento centrado y estilizado

### 🐛 Corregido
- **HomePage**: Corregido mapeo de links en la página principal
  - Solucionado error `infoUser.links.link` que causaba fallos
  - Ahora itera correctamente sobre el array de links con `.map()`
  - Muestra todos los links del usuario en lista

### 🎯 En Progreso
- Gestión completa de links (CRUD operations)
- Perfil público del usuario
- Drag & drop para reordenar links

---

## [0.1.0] - 2026-02-25

### ✨ Añadido

#### Autenticación
- Integración completa con Clerk para autenticación
- Rutas protegidas con middleware
- Sign in/Sign up pages
- Gestión de sesiones de usuario

#### Flujo de Onboarding (Multi-Step)
- **Step 1**: Selección de tipo de usuario (Personal, Negocio, Creador de Contenido, etc.)
  - Opciones predefinidas
  - Almacenamiento en React Context
- **Step 2**: Selección de plataformas sociales
  - Multi-select de plataformas (Instagram, Twitter, YouTube, etc.)
  - UI con botones interactivos
- **Step 3**: Ingreso de enlaces a plataformas
  - Campos de input para cada plataforma seleccionada
  - Validación de que todos los campos estén llenos
  - Soporte para usernames o URLs completas
- **Step 4**: Configuración de perfil
  - Grid de avatares predefinidos
  - Upload de imagen personalizada (UploadThing)
  - Input de nombre y username
  - Validación de campos requeridos
- **Step 5**: Resumen y confirmación
  - Vista previa de toda la configuración
  - Guardado en base de datos
  - Actualización de `firstLogin` flag

#### Upload de Archivos
- Integración con UploadThing
- Subida de imágenes de perfil (max 4MB)
- Soporte para PNG, JPG, JPEG, GIF
- Feedback visual con toasts (Sonner)
- Manejo de errores de upload

#### Base de Datos
- Schema de Prisma con dos modelos:
  - `User`: Información del usuario
  - `Link`: Enlaces asociados a usuarios
- Relación 1:N entre User y Link
- Cliente Prisma generado en `lib/generated/prisma/`
- Soporte para PostgreSQL con `@prisma/adapter-pg`

#### API Routes
- `GET /api/info-user`: Obtener información del usuario con links
- `POST /api/user`: Actualizar información del usuario
- `POST /api/uploadthing`: Handler de uploads

#### UI/UX
- Componentes de shadcn/ui integrados:
  - AlertDialog para modal de steps
  - Button con variantes
  - Input fields estilizados
  - Progress bar para steps
  - Avatar component
  - Sidebar, Sheet, Dropdown, etc.
- Toast notifications con Sonner
- Design system con Tailwind CSS
- Animaciones y transiciones suaves
- Responsive design para mobile/tablet/desktop

#### Arquitectura
- Next.js 16 App Router
- Server Components por defecto
- React 19 con nuevas features
- TypeScript en todo el proyecto
- Context API para gestión de estado
- Custom hooks (`useStepConfig`, `use-mobile`)
- Barrel exports para imports limpios

#### Configuración
- ESLint configurado
- Tailwind CSS 4 configurado
- PostCSS configurado
- TypeScript configurado
- Prisma configurado
- shadcn/ui configurado

#### Documentación
- README.md completo con:
  - Badges de tecnologías
  - Estructura del proyecto detallada
  - Guías de instalación
  - Documentación de API
  - Diagramas de flujo
- ARCHITECTURE.md con:
  - Diagramas de arquitectura
  - Flujos de datos
  - Patrones de diseño
  - Estructura de base de datos
- CONTRIBUTING.md con:
  - Guías de contribución
  - Estándares de código
  - Proceso de Pull Request
- .env.example con todas las variables necesarias

### 🔧 Configurado

#### Desarrollo
- Scripts de desarrollo configurados
- Hot reload funcionando
- Prisma Studio accesible
- Linting automático

#### Producción
- Build optimizado con Next.js
- Prisma Client generado
- Assets estáticos optimizados

### 🐛 Corregido

#### Clerk Middleware
- Ruta `/api/uploadthing` marcada como pública
- Previene loops infinitos en callbacks de upload
- Protección correcta de rutas privadas

#### UploadThing
- Uso de `ufsUrl` en lugar de `url` deprecado
- `onUploadComplete` en server retorna data correctamente
- Callback del cliente se dispara apropiadamente
- Límite de tamaño de archivo respetado (4MB)

#### UI/UX
- Progress bar muestra el progreso correcto
- Validación de formularios en Step 4
- Mensajes de error claros
- Loading states implementados

### 📦 Dependencias

#### Production
- next: 16.1.6
- react: 19.2.3
- react-dom: 19.2.3
- @clerk/nextjs: 6.37.4
- @prisma/client: 7.4.0
- @prisma/adapter-pg: 7.4.0
- uploadthing: 7.7.4
- @uploadthing/react: 7.3.3
- sonner: 2.0.7
- axios: 1.13.5
- lucide-react: 0.564.0
- react-icons: 5.5.0
- tailwindcss: 4.x
- pg: 8.18.0

#### Development
- typescript: 5.x
- eslint: 9.x
- prisma: 7.4.0
- shadcn: 3.8.4
- tsx: 4.21.0

### 🚀 Performance

- Server Components reducen bundle size
- Lazy loading de imágenes con Next/Image
- Prisma Client singleton previene instancias múltiples
- Tailwind JIT genera CSS mínimo
- Code splitting automático

### 🔐 Seguridad

- Rutas protegidas con Clerk middleware
- Validación de inputs en cliente y servidor
- Variables de entorno para credenciales
- CORS configurado correctamente
- Session management seguro

---

## Tipo de Cambios

- `✨ Añadido` - Nueva funcionalidad
- `🔧 Configurado` - Configuración inicial o actualizada
- `🔄 Cambiado` - Cambios en funcionalidad existente
- `🐛 Corregido` - Bug fixes
- `🗑️ Removido` - Funcionalidad removida
- `🔐 Seguridad` - Vulnerabilidades o mejoras de seguridad
- `📦 Dependencias` - Actualizaciones de paquetes
- `🚀 Performance` - Mejoras de rendimiento
- `📝 Documentación` - Cambios solo en documentación

---

## Links

- [Repositorio](https://github.com/tu-usuario/terra-link)
- [Issues](https://github.com/tu-usuario/terra-link/issues)
- [Pull Requests](https://github.com/tu-usuario/terra-link/pulls)

---

**Formato del changelog:**
```
## [version] - YYYY-MM-DD

### Tipo de Cambio
- Descripción del cambio (#issue-number si aplica)
```
