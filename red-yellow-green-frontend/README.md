# How to Run This Application

## Prerequisites
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)
- (Optional) [Docker](https://www.docker.com/) if you want to run the app in a container

## Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd red-yellow-green-frontend/red-yellow-green-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   > **Note:** If you see errors about missing packages (like `axios`), run:
   > ```sh
   > npm install axios
   > ```

## Running the Frontend (Locally)
1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and go to [http://localhost:5173](http://localhost:5173)

## Running the Frontend (with Docker Compose)
1. Start the frontend using Docker Compose:
   ```sh
   docker compose up --build
   ```
2. Open your browser and go to [http://localhost:5173](http://localhost:5173)

## Backend Requirements
- The frontend expects a backend API and SignalR server running on [http://localhost:5000](http://localhost:5000).
- Make sure your backend is running and CORS is enabled for `http://localhost:5173` (or `http://localhost:8080` if using Docker).

## Troubleshooting
- If port 5173 (local) or 8080 (Docker) is in use, stop any other process using it or change the port in `vite.config.ts` or Docker run command.
- If you see CORS errors, check your backend CORS configuration.
- If you see missing package errors, run `npm install <package-name>`.

## Project Structure
- `src/` contains all source code
- `src/components/` contains React components
- `src/services/` contains API and SignalR logic
- `src/types/` contains TypeScript types

---

# React + TypeScript + Vite

This template is a starting point for building React applications with TypeScript and Vite. It provides a modern build setup with no configuration required.

## Features
- React 18
- TypeScript 4.4+
- Vite 2.5+ (fast development server and build tool)
- JSX and TSX support
- CSS and Sass support
- PostCSS and Autoprefixer
- ESLint and Prettier for code quality and formatting

## Getting Started
To get started, run the following commands:

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and go to [http://localhost:5173](http://localhost:5173) to see your app in action.

## Building for Production
To build the app for production, run:

```sh
npm run build
```

This will create an optimized build of your app in the `dist` directory.

## Previewing the Production Build
To preview the production build locally, you can use the `serve` command:

```sh
npm run serve
```

This will start a local server for you to preview the production build at [http://localhost:5000](http://localhost:5000).

## Customizing the Template
You can customize this template to fit your needs. Some common customizations include:

- Updating the `vite.config.ts` file to change the Vite configuration.
- Modifying the `tsconfig.json` file to change the TypeScript configuration.
- Adding or removing dependencies in the `package.json` file.

## Learn More
To learn more about React, TypeScript, and Vite, check out the following resources:

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)

## License
This template is open-source and available under the [MIT License](LICENSE).
