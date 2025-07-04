// src/pages/Login.tsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
          setError("Credenciales incorrectas");
        } else {
          setError("Error: " + err.message);
        }
      } else {
        setError("Error desconocido");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow" onSubmit={handleLogin}>
        <h1 className="text-xl mb-4 font-semibold">Login Admin</h1>
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
