# Pull Request

## 📝 Descripción

Breve descripción de qué hace este PR y por qué es necesario.

## 🔗 Issue Relacionado

Fixes #[número de issue]
<!-- Si no hay issue, explica por qué este cambio es necesario -->

## 🧪 Tipo de Cambio

Por favor elimina las opciones que no sean relevantes:

- [ ] 🐛 Bug fix (non-breaking change que soluciona un issue)
- [ ] ✨ New feature (non-breaking change que agrega funcionalidad)
- [ ] 💥 Breaking change (fix o feature que causaría que funcionalidad existente no funcione como se esperaba)
- [ ] 📚 Documentation update (cambios solo en documentación)
- [ ] 🎨 Style/UI update (cambios de interfaz sin afectar funcionalidad)
- [ ] ♻️ Code refactoring (sin cambiar funcionalidad)
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test update (agregar o modificar tests)
- [ ] 🔧 Configuration/build update

## 🎯 ¿Qué Cambia?

### Antes
<!-- Describe el comportamiento anterior o el problema -->

### Después
<!-- Describe el nuevo comportamiento o la solución -->

## 💻 Cambios Técnicos

Lista los cambios principales realizados:

- [ ] Cambio 1
- [ ] Cambio 2
- [ ] Cambio 3

## 📸 Screenshots (si aplica)

### Antes
<!-- Agrega screenshots del estado anterior si es un cambio visual -->

### Después
<!-- Agrega screenshots del nuevo estado -->

## 🧪 Cómo Probar

Instrucciones paso a paso para que los reviewers puedan probar los cambios:

1. Paso 1
2. Paso 2
3. Paso 3
4. Verificar que...

## ✅ Checklist

Por favor verifica que tu PR cumple con estos requisitos:

### Código
- [ ] Mi código sigue las guías de estilo del proyecto
- [ ] He realizado una auto-revisión de mi propio código
- [ ] He comentado mi código, particularmente en áreas difíciles de entender
- [ ] Mis cambios no generan nuevos warnings
- [ ] He agregado ejemplos en los comentarios si es código complejo

### Testing
- [ ] He probado mis cambios localmente
- [ ] He probado en diferentes navegadores (si aplica)
- [ ] He probado en diferentes tamaños de pantalla (si aplica)
- [ ] Todos los tests pasan exitosamente
- [ ] He agregado tests que prueban mi fix o feature (si aplica)

### Documentación
- [ ] He actualizado la documentación correspondiente
- [ ] He actualizado el CHANGELOG.md (si aplica)
- [ ] He actualizado el README si es necesario
- [ ] He actualizado comentarios de código

### Base de Datos (si aplica)
- [ ] He creado migraciones de Prisma necesarias
- [ ] He probado las migraciones en una DB limpia
- [ ] He documentado cambios en el schema

### Dependencies
- [ ] No he agregado dependencias innecesarias
- [ ] Si agregué dependencias, he justificado por qué son necesarias
- [ ] He actualizado package.json y lockfile

### Git
- [ ] Mi código está en una rama con un nombre descriptivo
- [ ] Mis commits siguen el formato de Conventional Commits
- [ ] He hecho rebase con main para evitar conflictos
- [ ] Solo he cambiado archivos relevantes al PR

## 🔍 Áreas de Revisión

¿Hay algo específico que quieras que los reviewers verifiquen?

- [ ] Lógica de negocio en [archivo]
- [ ] Performance de [componente/función]
- [ ] Accesibilidad de [componente UI]
- [ ] Seguridad de [endpoint/función]

## ⚠️ Breaking Changes (si aplica)

Si este PR introduce breaking changes, descríbelos aquí:

### Cambios que Rompen Compatibilidad
- Cambio 1 y por qué es necesario
- Cambio 2 y su impacto

### Migration Path
Pasos que los usuarios deben seguir para adaptarse a los breaking changes:
1. Paso 1
2. Paso 2

## 🎯 Performance Impact

¿Este PR afecta la performance?

- [ ] ✅ Mejora la performance
- [ ] ⚠️ Podría afectar la performance (explicar)
- [ ] ➖ Sin impacto en performance

Si afecta, describe los cambios y benchmarks si los tienes.

## 📱 Impacto en Mobile

- [ ] He probado en dispositivos móviles
- [ ] El diseño es responsive
- [ ] Las interacciones funcionan en touch

## ♿ Accesibilidad

- [ ] He verificado accesibilidad (ARIA labels, keyboard navigation, etc.)
- [ ] Los cambios son accesibles para screen readers
- [ ] El contraste de colores cumple con WCAG

## 🔐 Seguridad

- [ ] No expongo información sensible (API keys, passwords, etc.)
- [ ] He validado inputs del usuario
- [ ] He considerado posibles vulnerabilidades (XSS, CSRF, etc.)
- [ ] He actualizado variables de entorno si es necesario

## 💬 Notas para Reviewers

Agrega cualquier nota adicional, preocupaciones, o áreas que necesitan discusión:

<!--
Ejemplos:
- "No estoy seguro si esta es la mejor forma de implementar X"
- "Alternativas consideradas: Y, Z - elegí X porque..."
- "Necesito feedback sobre el naming de estas funciones"
-->

## 🔗 Links Útiles

- [Documentación relevante](link)
- [Issue original](link)
- [Design en Figma](link)
- [Discusión relacionada](link)

## 📋 Post-Merge Checklist

Tareas a realizar después de que el PR sea mergeado:

- [ ] Actualizar documentación externa
- [ ] Notificar a stakeholders
- [ ] Hacer deployment a staging/production
- [ ] Monitorear errores en Sentry (si aplica)
- [ ] Cerrar issues relacionados

---

**Agradecimientos:**
<!-- Opcional: Menciona a personas que te ayudaron con este PR -->

---

<!--
Gracias por contribuir a TerraLink! 🎉
Tu tiempo y esfuerzo son muy apreciados.
-->
