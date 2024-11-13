// src/App.js
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import HomePage from './pages/HomePage'; // Import your protected homepage component
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Register from './components/Register';

function App() {
  return (
    <Routes>
      {/* Public route, accessible only if not authenticated */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage /> {/* Component you want to protect */}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
