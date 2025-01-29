# PDF Talker

Este proyecto es una aplicación web construida con Astro que permite a los usuarios subir archivos PDF y procesarlos utilizando Cloudinary. La aplicación también utiliza Svelte para la interfaz de usuario y Tailwind CSS para el diseño.

## 🚀 Comenzando

Para comenzar con este proyecto, sigue los siguientes pasos:

### Prerrequisitos

Asegúrate de tener instalados los siguientes programas:

- Node.js (versión 14 o superior)
- pnpm (gestor de paquetes)

### Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/pdf-talker.git
   cd pdf-talker
   ```

2. Instala las dependencias:

   ```sh
   pnpm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

   ```env
   API_KEY=tu_api_key
   API_SECRET=tu_api_secret
   ```

### Uso

1. Inicia el servidor de desarrollo:

   ```sh
   pnpm run dev
   ```

2. Abre tu navegador y navega a `http://localhost:4321`.

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | Instala las dependencias                         |
| `pnpm run dev`            | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm run build`          | Construye el sitio de producción en `./dist/`    |
| `pnpm run preview`        | Previsualiza tu construcción localmente, antes de desplegar |
| `pnpm run astro ...`      | Ejecuta comandos de CLI como `astro add`, `astro check` |
| `pnpm run astro -- --help`| Obtén ayuda usando la CLI de Astro               |

## 👀 ¿Quieres aprender más?

Siéntete libre de revisar [nuestra documentación](https://docs.astro.build) o unirte a nuestro [servidor de Discord](https://astro.build/chat).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)
