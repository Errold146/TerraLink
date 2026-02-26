# Política de Seguridad

## Versiones Soportadas

Actualmente estamos dando soporte de seguridad a las siguientes versiones de TerraLink:

| Versión | Soportada          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reportar una Vulnerabilidad

La seguridad de TerraLink es una prioridad alta. Si descubres una vulnerabilidad de seguridad, te agradecemos que nos lo notifiques de manera responsable.

### 🔐 Proceso de Reporte

**Por favor NO reportes vulnerabilidades de seguridad públicamente a través de GitHub Issues.**

En su lugar, envía un email a: **[errold222@gmail.com]**

### 📧 Información a Incluir

Cuando reportes una vulnerabilidad, por favor incluye:

1. **Descripción de la vulnerabilidad**
   - Tipo de issue (e.g., XSS, SQL injection, CSRF, etc.)
   - Componente o archivo afectado
   - Severidad estimada (Low, Medium, High, Critical)

2. **Pasos para reproducir**
   - Instrucciones detalladas paso a paso
   - Código de prueba de concepto (PoC) si es aplicable
   - Screenshots o videos si es relevante

3. **Impacto potencial**
   - ¿Qué puede hacer un atacante?
   - ¿Qué datos están en riesgo?
   - ¿Afecta a todos los usuarios o solo a algunos?

4. **Tu información**
   - Nombre (si deseas crédito público)
   - Email de contacto
   - Cuenta de GitHub (opcional)

### 📊 Ejemplo de Reporte

```markdown
Subject: [SECURITY] XSS Vulnerability in User Profile

## Descripción
Vulnerabilidad de Cross-Site Scripting (XSS) en el campo de nombre de usuario.

## Severidad
High

## Componente Afectado
- Archivo: components/home/StepFour.tsx
- Endpoint: /api/user

## Pasos para Reproducir
1. Ir a Step 4 del onboarding
2. Ingresar `<script>alert('XSS')</script>` en el campo de nombre
3. Continuar al dashboard
4. El script se ejecuta

## Impacto
Un atacante puede inyectar JavaScript malicioso que se ejecutará en el navegador
de otros usuarios que visiten el perfil.

## Solución Sugerida
Sanitizar inputs del usuario antes de renderizar.
```

## 🕐 Tiempo de Respuesta

- **Initial Response**: Dentro de 48 horas reconoceremos tu reporte
- **Status Update**: Te mantendremos informado cada 7 días sobre el progreso
- **Resolution Time**: Nos esforzamos por resolver vulnerabilidades críticas en 30 días

## 🎯 Proceso de Manejo

1. **Recepción**: Recibimos tu reporte y confirmamos recepción
2. **Validación**: Verificamos y reproducimos la vulnerabilidad
3. **Assessment**: Evaluamos severidad e impacto
4. **Fix Development**: Desarrollamos y probamos un fix
5. **Disclosure**: Coordinamos la divulgación pública
6. **Release**: Publicamos el fix y actualizamos la documentación
7. **Credit**: Te damos crédito público (si lo deseas)

## 🏆 Reconocimiento

Mantenemos un "Hall of Fame" de investigadores de seguridad que han ayudado a mejorar TerraLink:

### 2026
- [Errold Núñez Sánchez]

## 📋 Vulnerabilidades Conocidas

Actualmente, no hay vulnerabilidades conocidas no parchadas.

### Historial de Vulnerabilidades Resueltas

| ID | Fecha | Severidad | Descripción | Fixed In |
|----|-------|-----------|-------------|----------|
| - | - | - | - | - |

## 🛡️ Medidas de Seguridad Actuales

TerraLink implementa las siguientes medidas de seguridad:

### Autenticación y Autorización
- ✅ Autenticación gestionada por Clerk (OAuth 2.0)
- ✅ Session management seguro
- ✅ Middleware para protección de rutas
- ✅ CSRF protection habilitado

### Datos
- ✅ Variables de entorno para credenciales sensibles
- ✅ Conexiones a DB encriptadas (SSL)
- ✅ Hashing de passwords (gestionado por Clerk)
- ✅ Prepared statements (Prisma ORM)

### Aplicación
- ✅ HTTPS enforced en producción
- ✅ Security headers configurados
- ✅ Input validation en cliente y servidor
- ✅ Rate limiting en API routes
- ✅ File upload restrictions (tipo, tamaño)

### Dependencias
- ✅ Actualizaciones regulares de dependencias
- ✅ Escaneo automático de vulnerabilidades (Dependabot)
- ✅ Uso de versiones estables y mantenidas

## 🚫 Fuera de Alcance

Las siguientes áreas están fuera del alcance de nuestro programa de seguridad:

- ❌ Ataques de ingeniería social
- ❌ Vulnerabilidades en dependencias third-party sin PoC de explotación
- ❌ Problemas ya reportados o conocidos
- ❌ Issues de UI/UX que no impactan seguridad
- ❌ Rate limiting bypass sin impacto de seguridad
- ❌ Missing security headers sin demostración de impacto

## 🔒 Mejores Prácticas para Desarrolladores

Si eres un desarrollador contribuyendo a TerraLink:

### Input Validation
```typescript
// ✅ BUENO
const username = z.string().min(3).max(20).parse(input);

// ❌ MALO
const username = input; // Sin validación
```

### Output Encoding
```typescript
// ✅ BUENO - React escapa automáticamente
<div>{user.name}</div>

// ❌ MALO
<div dangerouslySetInnerHTML={{ __html: user.name }} />
```

### Secrets Management
```typescript
// ✅ BUENO
const apiKey = process.env.API_KEY;

// ❌ MALO
const apiKey = "sk_live_123456789"; // Hardcoded
```

### Database Queries
```typescript
// ✅ BUENO - Prisma usa prepared statements
const user = await prisma.user.findUnique({ where: { id: userId } });

// ❌ MALO - Raw SQL sin sanitizar
const user = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${userId}`;
```

## 📚 Recursos de Seguridad

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Clerk Security Docs](https://clerk.com/docs/security/overview)
- [Prisma Security Checklist](https://www.prisma.io/docs/guides/security)

## 📞 Contacto

Para preguntas sobre seguridad:
[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin)](https://linkedin.com/in/errold-núñez-sánchez)
[![Email](https://img.shields.io/badge/Email-ErroldNúñezS-D14836?logo=gmail)](mailto:errold222@gmail.com)

Para otros temas:
- Issues generales: [GitHub Issues](https://github.com/tu-usuario/terra-link/issues)
- Preguntas de desarrollo: [GitHub Discussions](https://github.com/tu-usuario/terra-link/discussions)

---

**Gracias por ayudar a mantener TerraLink seguro! 🔐**

---

<div align="center">

**Última actualización:** Febrero 2026

[⬅️ Volver al README](README.md)

Made with ❤️ and 🔐 by the TerraLink team

</div>
