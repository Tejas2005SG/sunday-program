import { ClipboardList, Phone } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface ContactSectionProps {
  t: typeof I18N["en"];
}

export default function ContactSection({ t }: ContactSectionProps) {
  return (
    <section id="contact" className="contact-section py-24 bg-[#F7F4EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="contact-cta bg-white/70 backdrop-blur border border-[#D5CDBD] p-10 md:p-16 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#F0EBE0] rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white rounded-full blur-3xl opacity-60"></div>

          <div className="relative z-10">
            <h2 className="section-title-anim text-4xl md:text-5xl font-bold text-[#122E43] font-serif mb-6">{t.contact.title}</h2>
            <div className="section-title-anim inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#D5CDBD] mb-10">
              <ClipboardList className="w-5 h-5 text-[#9B3A30]" />
              <span className="font-semibold text-gray-800 text-lg">{t.contact.limited}</span>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 text-gray-800 font-medium mb-10 text-lg">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-[#122E43]">Manasi Bhor:</span>
                <a href="tel:8975701626" className="text-[#9B3A30] hover:underline">8975701626</a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-[#122E43]">Dr. Himanshu Kamble:</span>
                <a href="tel:9619889178" className="text-[#9B3A30] hover:underline">9619889178</a>
              </div>
            </div>

            <a href="/register" className="contact-cta bg-[#122E43] text-white text-lg px-10 py-4 rounded-full shadow-2xl inline-flex items-center hover:-translate-y-1 transition-transform font-bold">
              <Phone className="w-5 h-5 mr-3" />
              {t.contact.btn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
