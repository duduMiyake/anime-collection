"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Aqui você pode chamar sua API ou lógica de autenticação
      if (email === "teste@anime.com" && password === "123456") {
        router.push("/"); // Redireciona para a HomePage
      } else {
        alert("Credenciais inválidas.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0F0F0F] text-white">
      <div className="w-full max-w-md bg-[#1A1A1A] p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD6BA]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Senha</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD6BA]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#FFD6BA] text-black font-semibold rounded-lg hover:brightness-90 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#FFD6BA] cursor-pointer hover:underline"
          >
            Registrar
          </Link>
        </p>
      </div>
    </main>
  );
}
