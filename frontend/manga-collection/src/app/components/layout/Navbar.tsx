"use client";

export default function Navbar() {
  return (
    <nav className="bg-[#555b6e] text-white py-4">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="text-xl font-bold">MinhaLogo</div>

        <ul className="flex gap-6 text-sm md:text-base">
          <li className="hover:text-gray-300 cursor-pointer">Início</li>
          <li className="hover:text-gray-300 cursor-pointer">Animes</li>
          <li className="hover:text-gray-300 cursor-pointer">Sobre</li>
        </ul>
      </div>
    </nav>
  );
}
