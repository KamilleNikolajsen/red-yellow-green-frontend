# How to Run This Application

## Prerequisites
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)

## Installation
1. Open a terminal and navigate to the project directory:
   ```sh
   cd red-yellow-green-frontend/red-yellow-green-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Frontend
1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and go to [http://localhost:5173](http://localhost:5173)

## Backend Requirements
- The frontend expects a backend API and SignalR server running on [http://localhost:5000](http://localhost:5000).

#### CORS Configuration
- The backend allows requests from the frontend at [http://localhost:5173](http://localhost:5173).

## Project Structure
- `src/` contains all source code
- `src/components/` contains React components
- `src/services/` contains API and SignalR logic
- `src/types/` contains TypeScript types
