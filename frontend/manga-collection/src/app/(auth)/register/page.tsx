"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/api";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      await registerUser({
        username,
        email,
        password,
      });

      toast.success("Usuário registrado com sucesso!");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      toast.error("Erro ao registrar. Verifique os dados.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0F0F0F] text-white">
      <div className="w-full max-w-md bg-[#1A1A1A] p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD6BA]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD6BA]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD6BA]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#FFD6BA] text-black font-semibold rounded-lg hover:brightness-90 transition"
          >
            Create
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-[#FFD6BA] cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
