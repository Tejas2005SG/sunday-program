"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Menu, Mail, Phone, CalendarDays } from "lucide-react";
import AdminSidebar from "@/components/registration/AdminSidebar";
import Loader from "@/components/registration/Loader";
import toast from "react-hot-toast";

interface ContactData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const { status } = useSession();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }
    if (status === "authenticated") {
      fetchContacts();
    }
  }, [status, router]);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContacts(data.contacts);
    } catch {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || (status === "authenticated" && loading)) {
    return <Loader fullScreen text="Loading contacts..." />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 dark:bg-neutral-950/80 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 lg:hidden dark:hover:bg-neutral-800"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-foreground">Contact Messages</h1>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {contacts.length === 0 ? (
             <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <Mail className="mx-auto h-10 w-10 text-neutral-400 mb-4" />
                <h3 className="text-lg font-medium text-foreground">No messages yet</h3>
                <p className="text-sm text-muted-foreground mt-1">When users contact you, their messages will appear here.</p>
             </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {contacts.map((contact) => (
                <div key={contact._id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl shadow-sm">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <h3 className="font-bold text-foreground text-lg">{contact.name}</h3>
                         <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <CalendarDays size={14} />
                            {new Date(contact.createdAt).toLocaleDateString()}
                         </div>
                      </div>
                   </div>
                   
                   <div className="space-y-2 mb-4">
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline">
                         <Mail size={14} />
                         {contact.email}
                      </a>
                      <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                         <Phone size={14} />
                         {contact.phone}
                      </a>
                   </div>

                   <div className="bg-neutral-50 dark:bg-neutral-950 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800">
                      <p className="text-sm text-foreground whitespace-pre-wrap">{contact.message}</p>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
