"use client";

import { useState } from "react";
import SiteNavbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

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
      
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[var(--background)] flex flex-col">
      <SiteNavbar lang="en" setLang={() => {}} scrolled={true} />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">Contact Us</h1>
            <p className="text-[var(--ink-soft)] mb-6">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 text-[var(--ink-soft)] font-medium mb-4">
              <div className="flex items-center justify-center gap-2 bg-white dark:bg-neutral-900 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800">
                <span className="font-bold text-[var(--foreground)]">Manasi Bhor:</span>
                <a href="tel:8975701626" className="text-[var(--accent)] hover:underline">8975701626</a>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white dark:bg-neutral-900 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800">
                <span className="font-bold text-[var(--foreground)]">Dr. Himanshu Kamble:</span>
                <a href="tel:9619889178" className="text-[var(--accent)] hover:underline">9619889178</a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-200 dark:border-neutral-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-11 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-foreground"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-11 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-11 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-foreground"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pl-11 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-foreground resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-4 text-sm font-bold text-white transition-all hover:bg-[var(--accent-strong)] disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
