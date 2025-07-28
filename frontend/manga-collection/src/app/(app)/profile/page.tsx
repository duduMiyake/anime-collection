"use client";

import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";

export default function ProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <main className="min-h-screen text-white md:p-8">
      <div>Future upgrade</div>
      <button onClick={handleLogout} className="cursor-pointer">
        Logout
      </button>
    </main>
  );
}
