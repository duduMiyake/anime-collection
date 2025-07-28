import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "@/app/providers"; // ou "@/context/Providers", dependendo da sua estrutura
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ToastContainer aria-label="notificações" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
