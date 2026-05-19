"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Users,
  Clock,
  CheckCircle,
  CalendarDays,
  Menu,
  RefreshCw,
  Download,
} from "lucide-react";
import AdminSidebar from "@/components/registration/AdminSidebar";
import UserTable from "@/components/registration/UserTable";
import SearchBar from "@/components/registration/SearchBar";
import Loader from "@/components/registration/Loader";
import toast from "react-hot-toast";

interface Stats {
  totalRegistrations: number;
  pendingPayments: number;
  paidUsers: number;
  todayRegistrations: number;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  address: string;
  transactionId?: string;
  screenshotUrl?: string;
  paymentStatus: "pending" | "paid";
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function AdminDashboardPage() {
  const { status } = useSession();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalRegistrations: 0,
    pendingPayments: 0,
    paidUsers: 0,
    todayRegistrations: 0,
  });
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchAllForExport = async () => {
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "10000",
        search,
        status: statusFilter,
      });
      const res = await fetch(`/api/users?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      return data.users;
    } catch {
      toast.error("Failed to fetch data for export");
      return [];
    }
  };

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      const exportUsers = await fetchAllForExport();
      if (!exportUsers.length) {
        setExporting(false);
        return toast.error("No data to export");
      }
      const XLSX = await import("xlsx");
      const worksheet = XLSX.utils.json_to_sheet(
        exportUsers.map((u: any) => ({
          Name: u.name,
          Email: u.email,
          Phone: u.phone,
          Program: u.program,
          Address: u.address,
          Status: u.paymentStatus,
          "Transaction ID": u.transactionId || "N/A",
          Date: new Date(u.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }))
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
      XLSX.writeFile(workbook, "registrations.xlsx");
      toast.success("Excel exported successfully!");
    } catch (e) {
      toast.error("Failed to export Excel");
    }
    setExporting(false);
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const exportUsers = await fetchAllForExport();
      if (!exportUsers.length) {
        setExporting(false);
        return toast.error("No data to export");
      }
      const jsPDF = (await import("jspdf")).default;
      const autoTable = (await import("jspdf-autotable")).default;
      
      const doc = new jsPDF("landscape");
      doc.text("Registrations Report", 14, 15);
      
      const tableData = exportUsers.map((u: any) => [
        u.name,
        u.email,
        u.phone,
        u.program,
        u.address,
        u.paymentStatus,
        u.transactionId || "--",
        new Date(u.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
      ]);

      autoTable(doc, {
        head: [["Name", "Email", "Phone", "Program", "Address", "Status", "Transaction ID", "Date"]],
        body: tableData,
        startY: 20,
      });

      doc.save("registrations.pdf");
      toast.success("PDF exported successfully!");
    } catch (e) {
      toast.error("Failed to export PDF");
    }
    setExporting(false);
  };

  const fetchUsers = useCallback(
    async (page = 1, showRefreshIndicator = false) => {
      if (showRefreshIndicator) setRefreshing(true);
      else setLoading(true);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "10",
          search,
          status: statusFilter,
        });

        const res = await fetch(`/api/users?${params}`);
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/admin/login");
            return;
          }
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setUsers(data.users);
        setStats(data.stats);
        setPagination(data.pagination);
      } catch {
        toast.error("Failed to load registrations");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [search, statusFilter, router]
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }
    if (status === "authenticated") {
      fetchUsers(1);
    }
  }, [status, router, fetchUsers]);

  // Debounced search
  useEffect(() => {
    if (status !== "authenticated") return;
    const timer = setTimeout(() => {
      fetchUsers(1);
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter]);

  if (status === "loading" || (status === "authenticated" && loading && users.length === 0)) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  const statCards = [
    {
      label: "Total Registrations",
      value: stats.totalRegistrations,
      icon: Users,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      label: "Pending Payments",
      value: stats.pendingPayments,
      icon: Clock,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      label: "Paid Users",
      value: stats.paidUsers,
      icon: CheckCircle,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      label: "Today's Registrations",
      value: stats.todayRegistrations,
      icon: CalendarDays,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
  ];

  const filters = [
    { label: "All", value: "all" },
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 dark:bg-neutral-950/80 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 lg:hidden dark:hover:bg-neutral-800"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
          </div>
          <button
            onClick={() => fetchUsers(pagination.page, true)}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 w-full">
          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-neutral-200 bg-white p-3 sm:p-4 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <p className="text-[11px] sm:text-xs font-medium text-muted-foreground truncate">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-xl sm:text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl ${stat.color}`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Search and Filters */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-sm">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportExcel}
                  disabled={exporting}
                  className="flex items-center gap-1.5 rounded-xl border border-green-600/20 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100 disabled:opacity-50 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
                >
                  <Download size={14} />
                  Excel
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={exporting}
                  className="flex items-center gap-1.5 rounded-xl border border-red-600/20 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                >
                  <Download size={14} />
                  PDF
                </button>
              </div>
              <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-900">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setStatusFilter(f.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      statusFilter === f.value
                        ? "bg-accent text-white"
                        : "text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <Loader text="Loading registrations..." />
          ) : (
            <UserTable
              users={users}
              pagination={pagination}
              onPageChange={(page) => fetchUsers(page)}
              onRefresh={() => fetchUsers(pagination.page, true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
