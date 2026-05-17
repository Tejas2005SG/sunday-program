import { ClipboardList, Phone } from "lucide-react";
import { I18N } from "@/lib/i18n";

interface ContactSectionProps {
  t: typeof I18N["en"];
}

export default function ContactSection({ t }: ContactSectionProps) {
  return (
    <section id="contact" className="contact-section py-24 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="contact-cta glass-panel p-10 md:p-16 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[var(--accent-soft)] rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white rounded-full blur-3xl opacity-60"></div>

          <div className="relative z-10">
            <h2 className="section-title-anim text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">{t.contact.title}</h2>
            <div className="section-title-anim inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[var(--border)] mb-10">
              <ClipboardList className="w-5 h-5 text-[var(--accent-strong)]" />
              <span className="font-semibold text-[var(--ink-soft)] text-lg">{t.contact.limited}</span>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 text-[var(--ink-soft)] font-medium mb-10 text-lg">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-[var(--foreground)]">Manasi Bhor:</span>
                <a href="tel:8975701626" className="text-[var(--accent)] hover:underline">8975701626</a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold text-[var(--foreground)]">Himanshu Kamble:</span>
                <a href="tel:9619889178" className="text-[var(--accent)] hover:underline">9619889178</a>
              </div>
            </div>

            <a href="/register" className="contact-cta primary-button text-lg px-10 py-4 shadow-2xl inline-flex items-center hover:-translate-y-1 transition-transform">
              <Phone className="w-5 h-5 mr-3" />
              {t.contact.btn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
