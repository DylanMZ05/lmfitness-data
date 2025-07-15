// src/admin/dashboard.tsx
import React, { useEffect, useState } from "react";
import CatalogoAdmin from "./CatalogoAdmin";
import AdminOrdenPopup from "./AdminOrdenPopup";
import {
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../firebase";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-gray-600 text-xl">Verificando sesión...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          className="bg-white p-6 rounded shadow w-full max-w-sm"
          onSubmit={handleLogin}
        >
          <h1 className="text-xl mb-4 font-semibold text-center">
            Iniciar Sesión
          </h1>
          <input
            type="email"
            placeholder="Correo"
            className="border mb-2 p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border mb-4 p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-8 bg-white pb-8 min-h-screen">
      <div className="flex justify-between items-center px-6 mb-6 flex-wrap gap-4">
        <h2 className="text-4xl font-bold text-black">ADMIN PANEL</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPopup(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Administrar Exclusivos/Destacados
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      <CatalogoAdmin />
      {showPopup && <AdminOrdenPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Dashboard;
