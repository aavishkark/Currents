# Currents

A modern, immersive weather dashboard built with React, Vite, and Material UI. Currents provides real-time weather analytics, interactive forecasts, and personalized location tracking in a sleek, responsive interface.

---

## Overview

`Currents` is a feature-rich single-page application designed to make weather tracking beautiful and intuitive. Users can:
- **Track Real-Time Weather**: Get instant weather updates for any global location with detailed metrics.
- **Visualize Forecasts**: View interactive 5-day forecasts with trend charts for temperature, precipitation, and wind.
- **Personalize Experience**: Create an account to save favorite cities and manage preferences.
- **Interactive Maps & Charts**: Visualize weather data through dynamic charts and responsive layouts.
- **Immersive UI**: Enjoy a modern interface with ambient backgrounds, dark mode support, and smooth animations.

---

## Feature Highlights
- **Smart Dashboard** — `src/pages/Dashboard` delivers a greeting-based, context-aware overview of current conditions.
- **Detailed City Analytics** — `src/pages/City` provides comprehensive deep-dives including moon phases, sun cycles, and hourly trends.
- **Interactive Forecasts** — `src/Components/Forecast` features switchable charts for Temperature, Precipitation, and Wind data using `Recharts`.
- **Favorites Management** — `src/pages/Favorites` allows authenticated users to pin and manage their top locations.
- **Secure Authentication** — `src/pages/auth` handles user registration and login with secure backend integration.
- **Ambient Design** — `src/Components/AmbientBackground` creates a dynamic, mouse-aware visual atmosphere.
- **Responsive & Accessible** — Built with **Material UI** for a polished experience across all devices.

---

## Tech Stack

**Front-End & Core:**
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="vite" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="redux" />
  <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="mui" />
  <img src="https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=codeigniter&logoColor=white" alt="recharts" />
  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="react router" />
</p>

**Backend & Tools:**
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
</p>

---

## Project Structure

```
WeatherApp/
 ├─ Frontend/                # Client-side React Application
 │   ├─ src/
 │   │   ├─ Components/      # Reusable UI components (Navbar, Forecast, Charts)
 │   │   ├─ pages/           # Main views (Dashboard, City, Favorites, Auth)
 │   │   ├─ redux/           # Global state (Actions, Reducers, Store)
 │   │   ├─ Routes/          # specialized routing components
 │   │   ├─ utils/           # Helper functions
 │   │   └─ context/         # Theme and app context
 │   └─ ...
 ├─ Backend/                 # Server-side API (Node/Express)
 └─ ...
```

---

## Getting Started

1. **Install dependencies (Frontend)**
   ```bash
   cd Frontend
   npm install
   ```

2. **Install dependencies (Backend)**
   ```bash
   cd Backend
   npm install
   ```

3. **Start the Development Servers**
   
   **Frontend:**
   ```bash
   cd Frontend
   npm run dev
   ```
   **Backend:**
   ```bash
   cd Backend
   npm run server
   ```

4. **Access the Application**
   Visit `http://localhost:5173` (or the port shown in your terminal) to view the app.

---

## Available Scripts (Frontend)
- `npm run dev` — Launch the development server.
- `npm run build` — Compile the application for production.
- `npm run lint` — Run ESLint to check for code quality issues.
- `npm run preview` — Preview the built application locally.
