// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-[#7a9b9a] text-white mt-12">
      <div className="max-w-5xl mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} MinhaLogo. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
