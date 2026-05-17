import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#122E43] border-t border-[#122E43]/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6 opacity-90">
          <Image
            src="/logo.png"
            alt="Medha Samvardhan Gurukul Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-xl text-white font-serif tracking-tight">
            Medha Samvardhan Gurukul
          </span>
        </div>
        <p className="text-[#D5CDBD] font-medium mb-6">
          &copy; {new Date().getFullYear()} Medha Samvardhan Gurukul. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
