import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6 opacity-80">
          <Image
            src="/logo.png"
            alt="Medha Samvardhan Gurukul Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-xl text-[var(--foreground)] tracking-tight">
            Medha Samvardhan Gurukul
          </span>
        </div>
        <p className="text-[var(--ink-soft)] font-medium mb-6">
          &copy; {new Date().getFullYear()} Medha Samvardhan Gurukul. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
