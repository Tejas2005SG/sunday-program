"use client";

import { useState, useEffect } from "react";
import SiteNavbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";
import toast from "react-hot-toast";
import { I18N, Language } from "@/lib/i18n";

export default function ContactPage() {
  const [lang, setLang] = useState<Language>("en");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("lang") as Language | null;
    if (stored && I18N[stored]) {
      setLang(stored);
    }
  }, []);

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    window.localStorage.setItem("lang", newLang);
  };

  const t = I18N[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response. Please restart your Next.js development server.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      
      toast.success(t.contactPage.successMsg || "Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[var(--background)] flex flex-col">
      <SiteNavbar lang={lang} setLang={handleLangChange} scrolled={true} />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#122E43] mb-4 font-serif">{t.contactPage.title}</h1>
            <p className="text-[var(--ink-soft)] mb-6">{t.contactPage.subtitle}</p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 text-[var(--ink-soft)] font-medium mb-4">
              <div className="flex items-center justify-center gap-2 bg-white dark:bg-neutral-900 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800">
                <span className="font-bold text-[var(--foreground)]">Manasi Bhor:</span>
                <a href="tel:8975701626" className="text-[#9B3A30] hover:underline">8975701626</a>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white dark:bg-neutral-900 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800">
                <span className="font-bold text-[var(--foreground)]">Dr. Himanshu Kamble:</span>
                <a href="tel:9619889178" className="text-[#9B3A30] hover:underline">9619889178</a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-200 dark:border-neutral-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.contactPage.nameLabel}</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-11 outline-none focus:border-[#9B3A30] focus:ring-2 focus:ring-[#9B3A30]/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-foreground"
                    placeholder={t.contactPage.namePlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.contactPage.emailLabel}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-11 outline-none focus:border-[#9B3A30] focus:ring-2 focus:ring-[#9B3A30]/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-foreground"
                    placeholder={t.contactPage.emailPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.contactPage.phoneLabel}</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-11 outline-none focus:border-[#9B3A30] focus:ring-2 focus:ring-[#9B3A30]/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-foreground"
                    placeholder={t.contactPage.phonePlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.contactPage.messageLabel}</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-11 outline-none focus:border-[#9B3A30] focus:ring-2 focus:ring-[#9B3A30]/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-foreground resize-none"
                    placeholder={t.contactPage.messagePlaceholder}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#9B3A30] py-4 text-sm font-bold text-white transition-all hover:bg-[#9B3A30]/90 disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
                {loading ? t.contactPage.submittingBtn : t.contactPage.submitBtn}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
