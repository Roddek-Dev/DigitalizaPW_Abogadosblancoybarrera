---
description: Guía maestra y paso a paso para la creación ágil de páginas web estáticas con Astro
---

# 🚀 Workflow Ágil: Creación de Páginas Web Estáticas Premium de Alta Calidad (Mobile-First)

Esta guía sirve como **Contexto, Blueprint y Reglas de Desarrollo (Rules)** para la creación y rediseño de sitios web estáticos utilizando **Astro + TailwindCSS**. El objetivo es garantizar un proceso organizado, modular, con diseño UI/UX de alto nivel, una estructura **Mobile-First** impecable y con un despliegue manual a prueba de fallos.

---

## 🏗️ 1. Fase de Setup y Configuración Inicial (Perspectiva Mobile-First)

El objetivo de esta fase es tener el chasis del proyecto listo. Todo desarrollo debe enfocarse primero en cómo se verá en el teléfono antes de adaptarlo a pantallas de ordenador.

-   **Inicialización:** `npm create astro@latest ./` (seleccionar "Empty" o un template base).
-   **Instalación de TailwindCSS:** `npx astro add tailwind`.
-   **Configuración de Paletas en `tailwind.config.mjs`:**
    -   Definir colores corporativos estrictos y tipografías modernas. Usar variables del config siempre.
-   **Configuración Base `Layout.astro` (NUNCA OLVIDAR EL OVERFLOW):**
    -   Añadir inmediatamente la clase `overflow-x-hidden` en el `<html>` y `<body>`. Esto previene de raíz el error crítico del "espacio en blanco sobrante" o falso scroll horizontal en dispositivos móviles.
-   **Header y Menú Responsivo Pre-configurado:**
    -   Diseñar siempre la versión móvil y tablet antes de la de PC.
    -   El botón del Menú de Hamburguesa (`<button class="md:hidden">`) **nunca debe ser un mockup inactivo**. Debe llevar un `<script>` integrado de Vanilla JS para efectuar el toggle desde el inicio del proyecto.
-   **Estructura de Carpetas Clásica de Astro:** `/src/layouts/`, `/src/pages/`, `/src/components/`, `/src/data/`, etc.

---

## 🧩 2. Arquitectura de Datos (Separación de Responsabilidades)

Para agilizar rediseños e iteraciones futuras, la data (el contenido) y la presentación (el código) **siempre deben estar separados**.

-   **Archivos de Datos (`src/data/*.ts`)**
    -   Crear diccionarios estáticos como `team.ts`, `services.ts`, `testimonials.ts`.
-   **Mapeo Responsivo:** En los componentes `.astro`, usar el método `.map()`. Todo `grid` mapeado debe empezar siempre para móvil (`grid-cols-1`) y escalar solo cuando sea seguro (`md:grid-cols-2`, `lg:grid-cols-3`).

---

## 🎨 3. UI/UX de Arquitectura Premium (Diseño Aesthetic)

Un proyecto debe impresionar a primera vista y adaptarse orgánicamente al dispositivo.

-   **Fondos y Profundidad:** 
    -   Usar gradientes sutiles o texturas translúcidas CSS. Si una textura interrumpe la pantalla móvil, considerar ocultarla en móvil y dejar solo un color sólido (`bg-primary-900 lg:bg-[url(...)]`).
-   **Glassmorphism (Efecto Vidrio):**
    -   Combinar `bg-white/90` o `bg-black/80` con `backdrop-blur-md` e `inset-0`.
-   **Micro-interacciones:**
    -   Efectos Hover sutiles (`hover:-translate-y-2`) en tarjetas y botones. *Atención: los Hover se mantienen en PC, pero en móvil deben ser fáciles de tocar (zonas táctiles de al menos 44px de alto).*
-   **Jerarquía de Lectura Secuencial (Móvil):**
    -   **REGLA DE ORO:** Evitar el comportamiento automático de Tailwind donde, en un contenedor flex/grid, el móvil pone **todos los textos juntos y luego todas las fotos juntas.** Modificar la estructura condicionalmente (`lg:hidden`) para crear un bloque consecuente: "Misión Texto -> Foto -> Visión Texto -> Foto".

---

## 🖼️ 4. Optimización de Assets y SEO

Un sitio hermoso que tarda 10 segundos en cargar en una red 3G móvil, es un sitio abandonado.

-   **Formato de Imágen:**
    -   Usar **`.webp`**. Ignorar todo `.png` o `.jpg` pesado.
-   **Iconografía en Móvil:** 
    -   Cuidar el peso visual y márgenes de los SVGs. No dejar elementos "flotando" fuera de los márgenes nativos laterales de padding (ej: usar `px-4` o `px-6` a nivel global móvil).
-   **Auditoría de Residuos:**
    -   Correr scripts para limpiar imágenes que ya no se referencian antes de desplegar.

---

## 📱 5. Checklist de Control Mobile (Evitar Errores Clásicos)

Antes de dar el visto bueno a una página o subsección, el agente/desarrollador **debe auto-evaluarse** obligatoriamente y corregirlo si encuentra alguna de estas violaciones:

1.  *¿El botón de las 3 rayas del Navbar (Hamburguesa) abre de verdad un menú funcional en tamaño celular?* (Requerido: Añadir Script nativo).
2.  *¿Hay enlaces muertos con `#` en el Header o Footer que no lleven a las áreas correctas?*
3.  *Al poner vistas en pantalla pequeña, ¿tengo una cinta blanca horrorosa a la derecha provocando scroll horizontal?* (Requerido: inyectar `overflow-x-hidden` en html/body).
4.  *¿Estudié la lectura visual celular? ¿Hay fotos agrupadas abajo solas sin contexto en diseño multipantalla?* (Requerido: separar los bloques grandes condicionalmente para obligar a una lectura secuencial Texto-Imagen).

---

## 📦 6. El Despliegue (Cero Fricción: Método ZIP manual)

Hemos validado tajantemente que para entornos strictos de Shared Hosting (como Hostinger) donde el FTP bloquea, los túneles fallan y los trackers de GitHub enloquecen al leer `.gitignore`, **el despliegue manual empaquetado es la máxima ley de la velocidad y efectividad.** 

1.  **Construir:** `npm run build`. (Compilará y unirá todo en la carpeta `dist/`).
2.  **Empaquetar:** `cd dist/` y comprimir `zip -r ../nuestro_proyecto.zip ./*`.
3.  **Subida Inmediata:** Ir vía web al Administrador de Archivos, carpeta `public_html` del Hostinger. Subir el ZIP y darle *Extraer aquí*. (Cuidar de borrar `default.php` antes).

### 🤖 Resumen de Comandos a usar por Agentes (Contexto Cósmico CI/CD):
-   No uses plugins de terceros (ej. `FTP-Deploy-Action`) de GitHub con sitios estáticos en Hostinger.
-   No agotes más de 1 iteración intentando reparar reglas de FTP TLS intermitentes, si un ZIP manual de `/dist` se compila y sube en 2 minutos. **Priorizar Agilidad y Entregas Visibles sobre la sobre-automatización**.
-   **Siempre asume primero la visión táctil y reducida (Smartphone) antes que la inmensidad del ordenador.**
