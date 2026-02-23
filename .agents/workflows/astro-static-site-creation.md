---
description: Guía maestra y paso a paso para la creación ágil de páginas web estáticas con Astro
---

# 🚀 Workflow Ágil: Creación de Páginas Web Estáticas Premium con Astro

Esta guía sirve como **Contexto, Blueprint y Reglas de Desarrollo (Rules)** para la creación y rediseño de sitios web estáticos utilizando **Astro + TailwindCSS**. El objetivo es garantizar un proceso organizado, modular, con diseño UI/UX de alto nivel y con un despliegue manual a prueba de fallos.

---

## 🏗️ 1. Fase de Setup y Configuración Inicial

El objetivo de esta fase es tener el chasis del proyecto listo antes de tirar una sola línea de lógica visual.

-   **Inicialización:** `npm create astro@latest ./` (seleccionar "Empty" o un template base).
-   **Instalación de TailwindCSS:** `npx astro add tailwind`.
-   **Configuración de Paletas en `tailwind.config.mjs`:**
    -   Definir colores corporativos estrictos (ej. `primary`, `secondary`, `accent`, `brand-gold`).
    -   Definir tipografías modernas (ej. Inter, Outfit, Roboto).
    -   *Regla de Oro:* Todo el equipo debe usar las utilidades de color definidas en el archivo en lugar de colores hardcodeados (ej: usar `text-primary-900` en vez de `text-[#1a2b3c]`).
-   **Estructura de Carpetas:**
    -   `/src/layouts/`: Plantillas base (Layout.astro) que incluyen el Header, Footer, Fuentes y Meta-Tags.
    -   `/src/pages/`: Las rutas de la página (`index.astro`, `contacto.astro`, etc).
    -   `/src/components/`: Piezas de UI reutilizables (Cards, Botones, Formularios, Heros).
    -   `/src/data/`: Archivos TypeScript/AJAX con el contenido (Textos, Testimonios, Info de Contacto).
    -   `/src/assets/images/`: Archivos crudos de imágenes (Astro las procesará y optimizará automáticamente).
    -   `/public/images/`: Imágenes pesadas como videos cortos o íconos SVG globales estáticos.

---

## 🧩 2. Arquitectura de Datos (Separación de Responsabilidades)

Para agilizar rediseños e iteraciones futuras, la data (el contenido) y la presentación (el código) **siempre deben estar separados**.

-   **Archivos de Datos (`src/data/*.ts`)**
    -   Crear diccionarios estáticos como `team.ts`, `services.ts`, `testimonials.ts`.
    -   **Regla:** Si un cliente nos pide cambiar el "texto de un servicio", solo se toca el archivo `.ts`, no se toca el `.astro` para evitar dañar el layout.
-   **Mapeo Rápido:** En los componentes `.astro`, usar el método `.map()` sobre los archivos `.ts` para generar tarjetas repetibles de forma dinámica.

---

## 🎨 3. UI/UX de Arquitectura Premium (Diseño Aesthetic)

Un proyecto debe impresionar a primera vista. Evitamos los "MVPs" simples, cajas genéricas y colores planos.

-   **Fondos y Profundidad:** 
    -   Usar gradientes sutiles o texturas translúcidas CSS (ej. texturas SVG opacidad 5%).
    -   Nunca usar blanco puro (`bg-white`) para el fondo general si no contrasta; preferir `bg-zinc-50` o esquemas estructurados de claro/oscuro.
-   **Glassmorphism (Efecto Vidrio):**
    -   Combinar `bg-white/90` o `bg-black/80` con `backdrop-blur-md` e `inset-0` para componentes flotantes.
-   **Micro-interacciones (Estado Hover):**
    -   Toda tarjeta o botón clickeable debe levitar o iluminarse sutilmente (`hover:-translate-y-2`, `hover:shadow-xl`, `transition-all duration-300`).
-   **Jerarquía de Lectura (Snackable Content):**
    -   Mucho aire (Paddings generosos).
    -   Usar Badges (etiquetas de colores) arriba de los titulares para guiar el ojo (ej. `"SERVICIOS ESPECIALIZADOS"` en dorado pequeño antes del gran H1).

---

## 🖼️ 4. Optimización de Assets y SEO

Un sitio hermoso que tarda 10 segundos en cargar, es un sitio abandonado.

-   **Formato de Imágen:**
    -   **REGLA ESTRICTA:** Usar únicamente formatos rápidos y puros como **`.webp`** (o `SVG` para íconos). Ignorar y convertir todo `.png` o `.jpg` pesado.
-   **Iconografía:** 
    -   Usar SVGs en línea (`<svg>`) para heredar colores de Tailwind (`text-brand-gold fill-current`).
-   **Auditoría de Residuos:**
    -   Antes de desplegar, correr un script de Node (ej. `check_unused_images.mjs`) para escanear y eliminar las imágenes que ya no se referencian en el código para no inflar la carga del servidor final.
-   **SEO On-Page Dinámico:**
    -   El layout debe aceptar props `title` y `description`.
    -   Cada `page` debe inyectar sus propias descripciones enfocadas a motores de búsqueda (ej. `title="Bufete de Abogados | Firm Name"`).

---

## 📱 5. Control de Calidad y Depuración Móvil (Mobile-First)

El 80% de los usuarios verán la web en su teléfono. Antes del despliegue, es obligatorio revisar la experiencia móvil.

-   **Menú de Hamburguesa Activo:**
    -   Nunca dejar un `<button class="md:hidden">` sin funcionalidad.
    -   Crear siempre en el componente `Header.astro` un contenedor para el menú móvil (`id="mobile-menu"`) y añadir un `<script>` nativo de Vanilla JS al final del componente para hacer el toggle de las clases `hidden` / `flex`. Considerar `astro:page-load` si se usa ViewTransitions.
-   **Eliminación de la Franja Blanca Lateral (Overflow Horizontal):**
    -   Asegurarse de que ningún contenido sobrepase los bordes de la pantalla (generalmente por márgenes negativos `-mx-*` o posiciones absolutas).
    -   **REGLA OBLIGATORIA:** Añadir la clase `overflow-x-hidden` en el `<html>` y `<body>` dentro del archivo `Layout.astro` principal para cortar rígidamente cualquier espacio blanco lateral en smartphones.
-   **Lectura Secuencial (Textos e Imágenes Intercalados):**
    -   Evitar diseños de 2 columnas donde el móvil agrupe todo el texto arriba y todas las imágenes abajo.
    -   Codificar un diseño de asimilación rápida: separar los bloques para móviles usando `lg:hidden` intercalado, creando un ritmo "Texto > Imagen > Texto > Imagen", preservando el diseño asimétrico o de flexbox oculto solo para pantallas grandes (`hidden lg:flex`).

---

## 📦 5. El Despliegue (Cero Fricción: Método ZIP)

Hemos validado que para entornos strictos de Shared Hosting (como Hostinger) donde el FTP bloquea, los túneles y Git trackers fallan, **el despliegue manual empaquetado es el rey de la velocidad y efectividad.** 
La estrategia es minimizar el estrés de la infraestructura.

1.  **Construir (Build):**
    -   Abrir la terminal y ejecutar `npm run build`. 
    -   Astro compilará automáticamente los archivos `.astro` hacia HTML puro, minificará el CSS/JS y meterá todo junto a las imágenes en la carpeta raíz `dist/`.
2.  **Empaquetar (Zip):**
    -   Entrar a la carpeta generada: `cd dist/`
    -   Comprimir todo el contenido interno: `zip -r ../nuestro_proyecto.zip ./*` o hacerlo mediante el explorador de archivos.
3.  **Subida Inmediata (Panel del Hosting):**
    -   Acceder al Administrador de Archivos Web (Hostinger, cPanel, etc).
    -   Ir a la carpeta pública del servidor web (`public_html` o similar).
    -   **¡Importante!** Borrar archivos por defecto del servidor si es nuevo (ej. `default.php`).
    -   Subir el archivo `.zip`.
    -   Extraer el `.zip` directamente sobre `public_html`.
4.  **Confirmación:**
    -   Cargar el dominio (usar modo Incógnito para ignorar caché antiguo) y validar la versión en vivo.

---

### 🤖 Resumen de Comandos a usar por Agentes (Contexto de Memoria CI/CD):
-   No uses `SamKirkland/FTP-Deploy-Action` de GitHub con Hostinger para sitios compilados (Ignorará carpetas `/dist/` que no existan en el repo base de origen).
-   No pierdas +1 hora depurando reglas de FTP TLS en el terminal si un ZIP manual de la carpeta `/dist` se condensa y se sube en 2 minutos. **Priorizar Agilidad**.
