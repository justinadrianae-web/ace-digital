# 🟢 ACE Digital — Plataforma Web Oficial
### Alianza Colectiva Estudiantil · Facultad de Jurisprudencia · Universidad de Guayaquil

> Desarrollado por **Jostin Alvarado** en colaboración con ACE · 2025

---

## 📦 ¿Qué incluye este proyecto?

| Archivo / Carpeta | Descripción |
|---|---|
| `src/pages/` | Todas las páginas públicas (Home, Inscripción, Eventos, Docentes, Invitados, Contacto) |
| `src/pages/admin/` | Panel de administración completo (login con Supabase Auth) |
| `src/components/` | Navbar, Footer, Watermark, y secciones del Home |
| `src/lib/supabase.js` | Todos los helpers de conexión a la base de datos |
| `supabase_schema.sql` | Script SQL completo para crear todas las tablas |
| `ace_plataforma_v3.html` | Landing page HTML standalone (para compartir sin servidor) |
| `.env.example` | Plantilla de variables de entorno |

---

## 🚀 GUÍA DE INSTALACIÓN PASO A PASO

### PASO 1 — Instalar Node.js
1. Ve a https://nodejs.org
2. Descarga la versión **LTS** (la recomendada)
3. Instálala normalmente
4. Abre la terminal (cmd en Windows) y verifica: `node --version`

---

### PASO 2 — Crear cuenta y proyecto en Supabase (base de datos GRATIS)

1. Ve a **https://supabase.com** y crea una cuenta gratis
2. Haz clic en **"New Project"**
3. Ponle nombre: `ace-digital`
4. Elige una contraseña fuerte para la base de datos (guárdala)
5. Región: **South America (São Paulo)** — la más cercana a Ecuador
6. Espera ~2 minutos a que el proyecto se cree

**Crear las tablas:**
1. En tu proyecto, ve a **SQL Editor** (menú izquierdo)
2. Haz clic en **"New Query"**
3. Copia TODO el contenido del archivo `supabase_schema.sql`
4. Pégalo en el editor y haz clic en **"Run"**
5. Verás el mensaje: "Success. No rows returned"

**Obtener tus credenciales:**
1. Ve a **Settings → API** (menú izquierdo)
2. Copia:
   - **Project URL** → algo como `https://abcdefgh.supabase.co`
   - **anon public key** → una cadena larga que empieza con `eyJ...`

---

### PASO 3 — Crear cuenta de admin en Supabase Auth

1. En tu proyecto Supabase, ve a **Authentication → Users**
2. Haz clic en **"Add user" → "Create new user"**
3. Ingresa el correo y contraseña del admin de ACE
4. ¡Con esos datos podrás entrar al panel `/admin`!

---

### PASO 4 — Configurar el proyecto localmente

```bash
# 1. Descomprime el ZIP y entra a la carpeta
cd ace-digital

# 2. Copia el archivo de ejemplo de variables de entorno
cp .env.example .env
```

Abre el archivo `.env` con cualquier editor de texto y reemplaza:
```
VITE_SUPABASE_URL=https://TU_PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...TU_ANON_KEY...
```

---

### PASO 5 — Instalar dependencias y correr el proyecto

```bash
# Instalar todas las librerías (solo la primera vez)
npm install

# Correr en modo desarrollo (para ver los cambios en tiempo real)
npm run dev
```

Abre tu navegador en **http://localhost:5173** y verás la plataforma.

---

### PASO 6 — Configurar Brevo (correos automáticos GRATIS)

1. Ve a **https://app.brevo.com** y crea una cuenta gratis
2. Ve a **Account → SMTP & API → API Keys**
3. Crea una nueva API Key y cópiala
4. Agrega en tu `.env`:
```
VITE_BREVO_API_KEY=tu_api_key_aqui
VITE_EMAIL_FROM=noreply@ace-ug.com
VITE_EMAIL_NAME=ACE Alianza Colectiva Estudiantil
```

> ⚠️ Los correos automáticos en producción deben configurarse en Supabase Edge Functions. 
> Esta parte la implementas en la Fase 3 del roadmap.

---

### PASO 7 — Publicar en internet (GRATIS con Vercel)

```bash
# 1. Crea una cuenta en https://github.com (si no tienes)
# 2. Crea un repositorio nuevo llamado "ace-digital"
# 3. Sube el proyecto:
git init
git add .
git commit -m "ACE Digital - primera versión"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ace-digital.git
git push -u origin main

# 4. Ve a https://vercel.com
# 5. "New Project" → conecta tu repositorio de GitHub
# 6. En "Environment Variables" agrega las mismas del .env
# 7. Haz clic en "Deploy"
```

En ~2 minutos tendrás una URL pública como `ace-digital.vercel.app` 🎉

---

## 📁 ESTRUCTURA DEL PROYECTO

```
ace-digital/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          ← Barra de navegación
│   │   ├── Footer.jsx          ← Pie de página
│   │   ├── Watermark.jsx       ← Marca Jostin Alvarado × ACE
│   │   └── sections/           ← Secciones del Home
│   │       ├── Hero.jsx
│   │       ├── Historia.jsx
│   │       ├── Mision.jsx
│   │       ├── Valores.jsx
│   │       ├── Funciones.jsx
│   │       ├── Logros.jsx
│   │       ├── Galeria.jsx
│   │       ├── Equipo.jsx
│   │       ├── Roadmap.jsx
│   │       ├── Stack.jsx
│   │       ├── FAQ.jsx
│   │       └── CTA.jsx
│   ├── lib/
│   │   ├── supabase.js         ← Todas las funciones de base de datos
│   │   └── useReveal.js        ← Hook para animaciones scroll
│   ├── pages/
│   │   ├── Home.jsx            ← Página principal
│   │   ├── Inscripcion.jsx     ← Formulario de membresía
│   │   ├── Eventos.jsx         ← Proponer e inscribirse a eventos
│   │   ├── Docentes.jsx        ← Directorio de docentes
│   │   ├── Invitados.jsx       ← Portal REDMUN / externos
│   │   ├── Contacto.jsx        ← Formulario de contacto
│   │   ├── NotFound.jsx        ← Página 404
│   │   └── admin/
│   │       ├── AdminPanel.jsx      ← Login + dashboard admin
│   │       ├── AdminMiembros.jsx   ← Aprobar/rechazar miembros
│   │       ├── AdminEventos.jsx    ← Aprobar/rechazar eventos
│   │       ├── AdminSolicitudes.jsx← Solicitudes externas
│   │       └── AdminConsultas.jsx  ← Mensajes de contacto
│   ├── App.jsx                 ← Rutas de la aplicación
│   ├── main.jsx                ← Punto de entrada
│   └── index.css               ← Estilos globales
├── supabase_schema.sql         ← Script SQL para crear la BD
├── ace_plataforma_v3.html      ← Landing page HTML standalone
├── .env.example                ← Plantilla de variables
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔧 PERSONALIZACIÓN RÁPIDA

### Cambiar los datos del equipo
Edita el archivo: `src/components/sections/Equipo.jsx`
Reemplaza los `<!-- ADMIN: -->` con los nombres reales.

### Cambiar datos de líderes de contacto
Edita: `src/pages/Contacto.jsx` → array `LIDERES`

### Agregar fotos a la galería
Edita: `src/components/sections/Galeria.jsx`
Reemplaza cada celda con:
```jsx
<img src="/fotos/foto1.jpg" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:11}} />
```

### Agregar docentes reales
1. Ve al panel admin `/admin`
2. O ejecuta en Supabase SQL Editor:
```sql
INSERT INTO docentes (nombre, titulo, materia, horarios, correo)
VALUES ('Dr. Nombre Apellido', 'Dr.', 'Nombre de la Materia',
  '[{"dia":"Lunes","hora":"08:00-10:00"}]', 'correo@ug.edu.ec');
```

### Cambiar la historia de ACE
Edita: `src/components/sections/Historia.jsx`

---

## 🗓️ PRÓXIMOS PASOS (Roadmap)

- [ ] **Semana 1-2**: Configurar Supabase + subir a Vercel ← **EMPIEZA AQUÍ**
- [ ] **Semana 3-4**: Agregar datos reales (equipo, docentes, historia, fotos)
- [ ] **Semana 5-6**: Configurar correos automáticos con Supabase Edge Functions + Brevo
- [ ] **Semana 7-8**: Sistema de votaciones + Dashboard de métricas

---

## 💬 SOPORTE

**Desarrollado por:** Jostin Alvarado  
**Proyecto:** ACE Digital — Alianza Colectiva Estudiantil  
**Facultad:** Jurisprudencia y Ciencias Sociales · Universidad de Guayaquil  
**Año:** 2025

---

*Todos los derechos reservados · Jostin Alvarado × ACE · 2025*
