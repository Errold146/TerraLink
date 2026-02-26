# 🤝 Guía de Contribución - TerraLink

¡Gracias por tu interés en contribuir a TerraLink! Este documento te guiará a través del proceso de contribución.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Guías de Estilo](#guías-de-estilo)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

---

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código. Por favor, reporta comportamientos inaceptables.

### Nuestros Estándares

- Uso de lenguaje acogedor e inclusivo
- Respeto a diferentes puntos de vista y experiencias
- Aceptación de críticas constructivas
- Enfocarse en lo que es mejor para la comunidad

---

## 🎯 ¿Cómo puedo contribuir?

### Reportar Bugs 🐛

Los bugs se rastrean como [GitHub Issues](https://github.com/tu-usuario/terra-link/issues). Para reportar un bug:

1. **Verifica** que el bug no haya sido reportado previamente
2. **Usa** la plantilla de issue para bugs
3. **Incluye** los siguientes detalles:
   - Descripción clara y concisa del problema
   - Pasos para reproducir el comportamiento
   - Comportamiento esperado vs actual
   - Screenshots (si es aplicable)
   - Información del entorno (OS, navegador, versión de Node)

**Ejemplo:**
```markdown
**Bug Description**
El botón de "Continue" en Step 4 no funciona cuando no se selecciona una imagen.

**To Reproduce**
1. Ir a Step 4
2. Llenar nombre y username
3. Click en "Continue" sin seleccionar imagen
4. Ver error

**Expected Behavior**
Debería mostrar un mensaje de error indicando que la imagen es requerida.

**Environment**
- OS: Windows 11
- Browser: Chrome 120
- Node: 18.17.0
```

### Sugerir Mejoras ✨

Las sugerencias de mejoras también se rastrean como GitHub Issues. Para sugerir una mejora:

1. **Verifica** que la mejora no haya sido sugerida previamente
2. **Describe** la mejora que deseas ver
3. **Explica** por qué esta mejora sería útil
4. **Proporciona** ejemplos de cómo se usaría

### Contribuir con Código 💻

¿Listo para contribuir con código? ¡Genial!

---

## 🛠️ Configuración del Entorno de Desarrollo

### Requisitos Previos

- Node.js >= 18.x
- npm, yarn, o pnpm
- PostgreSQL instalado (o cuenta en Neon/Supabase)
- Git
- Editor de código (recomendado: VS Code)

### Setup Inicial

1. **Fork** el repositorio en GitHub

2. **Clona** tu fork localmente:
   ```bash
   git clone https://github.com/TU-USUARIO/terra-link.git
   cd terra-link
   ```

3. **Agrega** el repositorio original como upstream:
   ```bash
   git remote add upstream https://github.com/USUARIO-ORIGINAL/terra-link.git
   ```

4. **Instala** las dependencias:
   ```bash
   npm install
   ```

5. **Configura** las variables de entorno:
   ```bash
   cp .env.example .env
   # Edita .env con tus credenciales
   ```

6. **Configura** la base de datos:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

7. **Ejecuta** el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Extensiones Recomendadas para VS Code

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "formulahendry.auto-rename-tag",
    "dsznajder.es7-react-js-snippets"
  ]
}
```

---

## 🔄 Proceso de Desarrollo

### Workflow de Git

1. **Sincroniza** tu fork con upstream:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Crea** una rama para tu feature:
   ```bash
   git checkout -b feature/nombre-descriptivo
   # o
   git checkout -b fix/nombre-del-bug
   ```

3. **Haz** tus cambios y commits (ver guía de commits abajo)

4. **Prueba** tus cambios localmente:
   ```bash
   npm run dev      # Verifica que funcione
   npm run build    # Verifica que compile
   npm run lint     # Verifica el linting
   ```

5. **Push** a tu fork:
   ```bash
   git push origin feature/nombre-descriptivo
   ```

6. **Abre** un Pull Request en GitHub

### Nombres de Ramas

Usa prefijos descriptivos:

- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bugs
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código
- `test/` - Añadir o modificar tests
- `chore/` - Tareas de mantenimiento

**Ejemplos:**
- `feature/add-link-categories`
- `fix/upload-button-not-working`
- `docs/update-readme-installation`
- `refactor/step-four-component`

---

## 🎨 Guías de Estilo

### TypeScript

- **Usa TypeScript** para todo el código nuevo
- **Define tipos** explícitos para props y funciones
- **Evita `any`** siempre que sea posible
- **Usa interfaces** para objetos complejos

```typescript
// ✅ Bueno
interface UserProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

function UserCard({ name, email, avatarUrl }: UserProps) {
  // ...
}

// ❌ Malo
function UserCard(props: any) {
  // ...
}
```

### React Components

- **Usa componentes funcionales** con hooks
- **Nombra componentes** en PascalCase
- **Exporta** componentes de forma nombrada o default según convención
- **Agrupa** imports: React -> Third-party -> Local

```typescript
// ✅ Estructura preferida
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useStepConfig } from '@/hooks/useStepConfig';

export function MyComponent() {
  const [state, setState] = useState('');

  return <div>{/* ... */}</div>;
}
```

### Tailwind CSS

- **Usa clases de Tailwind** en lugar de CSS custom
- **Organiza clases** de forma lógica: layout → spacing → colors → otros
- **Usa `cn()`** de `lib/utils.ts` para clases condicionales
- **Extrae componentes** si las clases son muy largas

```typescript
// ✅ Bueno
<Button
  className={cn(
    "w-full py-2",
    "bg-emerald-500 hover:bg-emerald-600",
    "text-white font-semibold",
    isActive && "ring-2 ring-emerald-300"
  )}
>
  Click me
</Button>

// ❌ Evitar
<button style={{ width: '100%', backgroundColor: 'green' }}>
  Click me
</button>
```

### Naming Conventions

- **Variables**: camelCase
- **Componentes**: PascalCase
- **Archivos**: PascalCase para componentes, camelCase para utils
- **Constantes**: UPPER_SNAKE_CASE
- **Tipos/Interfaces**: PascalCase

```typescript
// Variables y funciones
const userName = 'John';
const fetchUserData = () => {};

// Componentes
export function UserProfile() {}

// Constantes
const MAX_FILE_SIZE = 4 * 1024 * 1024;

// Tipos
interface UserData {
  id: string;
  name: string;
}
```

### Estructura de Componentes

```typescript
import { useState } from 'react';              // React imports
import { Button } from '@/components/ui';      // UI components
import { useCustomHook } from '@/hooks';       // Custom hooks
import { type CustomType } from '@/types';     // Types

// Types/Interfaces
interface ComponentProps {
  title: string;
  onSubmit: () => void;
}

// Component
export function MyComponent({ title, onSubmit }: ComponentProps) {
  // Hooks
  const [state, setState] = useState('');

  // Constants/Variables
  const someValue = 'value';

  // Functions
  const handleClick = () => {
    // ...
  };

  // Effects
  useEffect(() => {
    // ...
  }, []);

  // Early returns
  if (!state) return null;

  // JSX
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

---

## 📝 Commit Messages

Seguimos el estándar de [Conventional Commits](https://www.conventionalcommits.org/).

### Formato

```
<tipo>(<scope>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (espacios, comas, etc.)
- `refactor`: Refactorización de código
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento

### Ejemplos

```bash
# Feature
git commit -m "feat(step-four): add drag and drop for image upload"

# Bug fix
git commit -m "fix(auth): resolve infinite loop in clerk middleware"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactor
git commit -m "refactor(components): extract common button styles"

# Chore
git commit -m "chore(deps): update next.js to 16.2.0"
```

### Consejos

- Usa el modo imperativo ("add" no "added")
- Primera línea: máximo 72 caracteres
- Separa subject del body con línea en blanco
- Explica el "qué" y "por qué", no el "cómo"

---

## 🔀 Pull Request Process

### Antes de Abrir el PR

1. ✅ Asegúrate de que el código compila sin errores
2. ✅ Ejecuta el linter y resuelve warnings
3. ✅ Prueba tu código localmente
4. ✅ Actualiza documentación si es necesario
5. ✅ Sincroniza con la rama main del upstream

### Descripción del PR

Usa esta plantilla:

```markdown
## 📝 Descripción

Breve descripción de qué hace este PR y por qué es necesario.

## 🔗 Issue Relacionado

Fixes #123 (si aplica)

## 🧪 Tipo de Cambio

- [ ] 🐛 Bug fix (non-breaking change)
- [ ] ✨ New feature (non-breaking change)
- [ ] 💥 Breaking change
- [ ] 📚 Documentation update

## ✅ Checklist

- [ ] Mi código sigue las guías de estilo del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado áreas complejas del código
- [ ] He actualizado la documentación correspondiente
- [ ] Mis cambios no generan nuevos warnings
- [ ] He probado mis cambios localmente

## 📸 Screenshots (si aplica)

[Añade screenshots si los cambios son visuales]

## 🧪 Cómo Probar

1. Paso 1
2. Paso 2
3. Paso 3
```

### Revisión de Código

- Responde a los comentarios de revisión de forma constructiva
- Haz los cambios solicitados o explica por qué no son necesarios
- Una vez aprobado, tu PR será mergeado por un maintainer

### Después del Merge

1. Actualiza tu fork:
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. Elimina tu rama (opcional):
   ```bash
   git branch -d feature/nombre-descriptivo
   git push origin --delete feature/nombre-descriptivo
   ```

---

## 🆘 ¿Necesitas Ayuda?

- 💬 [Discusiones de GitHub](https://github.com/tu-usuario/terra-link/discussions)
- 📧 Email: tu-email@example.com
- 🐦 Twitter: [@tu-usuario](https://twitter.com/tu-usuario)

---

## 🙏 Reconocimientos

Todos los contribuidores serán agregados a nuestro README y/o página de contribuidores.

---

**¡Gracias por contribuir a TerraLink! 🌴**
