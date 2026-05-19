"use client";

import { useState } from "react";
import {
  CheckCircle,
  Clock,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import toast from "react-hot-toast";

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

interface UserTableProps {
  users: UserData[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

export default function UserTable({
  users,
  pagination,
  onPageChange,
  onRefresh,
}: UserTableProps) {
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const updateStatus = async (userId: string, status: "pending" | "paid") => {
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/pay/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: status }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update status");
      }

      toast.success(`Payment marked as ${status}`);
      onRefresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast.error(message);
    } finally {
      setActionLoading(null);
      setOpenMenu(null);
    }
  };

  const deleteUser = async (userId: string) => {
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/users?id=${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }

      toast.success("Registration deleted");
      onRefresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Delete failed";
      toast.error(message);
    } finally {
      setActionLoading(null);
      setConfirmDelete(null);
      setOpenMenu(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center dark:bg-neutral-900 dark:border-neutral-700">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
          <Clock size={20} className="text-neutral-400" />
        </div>
        <p className="text-sm font-medium text-foreground">No registrations found</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/50">
              <th className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">
                Email
              </th>
              <th className="hidden whitespace-nowrap px-4 py-3 font-semibold text-foreground md:table-cell">
                Phone
              </th>
              <th className="hidden whitespace-nowrap px-4 py-3 font-semibold text-foreground lg:table-cell">
                Program
              </th>
              <th className="hidden whitespace-nowrap px-4 py-3 font-semibold text-foreground xl:table-cell">
                Address
              </th>
              <th className="hidden whitespace-nowrap px-4 py-3 font-semibold text-foreground sm:table-cell">
                Transaction ID
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">
                Screenshot
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">
                Status
              </th>
              <th className="hidden whitespace-nowrap px-4 py-3 font-semibold text-foreground md:table-cell">
                Date
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-neutral-100 transition-colors hover:bg-neutral-50 last:border-0 dark:border-neutral-800 dark:hover:bg-neutral-800/30"
              >
                <td className="whitespace-nowrap px-4 py-3 font-medium text-foreground">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {user.email}
                </td>
                <td className="hidden whitespace-nowrap px-4 py-3 text-muted-foreground md:table-cell">
                  {user.phone}
                </td>
                <td className="hidden px-4 py-3 lg:table-cell">
                  <span className="inline-block max-w-[350px] truncate align-bottom text-muted-foreground" title={user.program}>
                    {user.program}
                  </span>
                </td>
                <td className="hidden px-4 py-3 xl:table-cell">
                  <span className="inline-block max-w-[380px] truncate align-bottom text-muted-foreground" title={user.address}>
                    {user.address}
                  </span>
                </td>
                <td className="hidden whitespace-nowrap px-4 py-3 sm:table-cell">
                  {user.transactionId ? (
                    <code className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-mono dark:bg-neutral-800">
                      {user.transactionId}
                    </code>
                  ) : (
                    <span className="text-xs text-neutral-400">--</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {user.screenshotUrl ? (
                    <a
                      href={user.screenshotUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-purple-100 px-3 py-1.5 text-xs font-semibold text-purple-600 transition-colors hover:bg-purple-200"
                    >
                      <Eye size={12} />
                      View
                    </a>
                  ) : (
                    <span className="text-xs text-neutral-400">No Image</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={user.paymentStatus} />
                </td>
                <td className="hidden whitespace-nowrap px-4 py-3 text-muted-foreground md:table-cell">
                  {formatDate(user.createdAt)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === user._id ? null : user._id)
                      }
                      disabled={actionLoading === user._id}
                      className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-foreground disabled:opacity-50 dark:hover:bg-neutral-800"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {/* Action Popup Modal */}
                    {openMenu === user._id && (
                      <>
                        <div
                          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/50"
                          onClick={() => {
                            setOpenMenu(null);
                            setConfirmDelete(null);
                          }}
                        />
                        <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl dark:border-neutral-700 dark:bg-neutral-900">
                          <h3 className="mb-4 text-center text-lg font-bold text-foreground">
                            Actions for {user.name.split(" ")[0]}
                          </h3>
                          <div className="flex flex-col gap-2">
                            {user.screenshotUrl && (
                              <a
                                href={user.screenshotUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9B3A30]/10 py-3 text-sm font-semibold text-[#9B3A30] transition-colors hover:bg-[#9B3A30]/20"
                              >
                                <Eye size={18} />
                                View Screenshot
                              </a>
                            )}

                            {user.paymentStatus === "pending" ? (
                              <button
                                onClick={() => updateStatus(user._id, "paid")}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-50 py-3 text-sm font-semibold text-green-600 transition-colors hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
                              >
                                <CheckCircle size={18} />
                                Mark as Paid
                              </button>
                            ) : (
                              <button
                                onClick={() => updateStatus(user._id, "pending")}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-50 py-3 text-sm font-semibold text-amber-600 transition-colors hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"
                              >
                                <Clock size={18} />
                                Mark as Pending
                              </button>
                            )}

                            {confirmDelete === user._id ? (
                              <div className="mt-2 rounded-xl border border-red-100 bg-red-50/50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                                <p className="mb-3 text-center text-sm font-medium text-red-600 dark:text-red-400">
                                  Confirm deletion? This cannot be undone.
                                </p>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="flex-1 rounded-lg border border-neutral-200 bg-white py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => deleteUser(user._id)}
                                    className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
                                  >
                                    Yes, Delete
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(user._id)}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                              >
                                <Trash2 size={18} />
                                Delete Registration
                              </button>
                            )}

                            {!confirmDelete && (
                              <button
                                onClick={() => setOpenMenu(null)}
                                className="mt-2 w-full rounded-xl py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                              >
                                Close
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} registrations
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-neutral-800"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === pagination.totalPages ||
                  Math.abs(p - pagination.page) <= 1
              )
              .map((p, idx, arr) => (
                <span key={p}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span className="px-1 text-neutral-400">...</span>
                  )}
                  <button
                    onClick={() => onPageChange(p)}
                    className={`min-w-[32px] rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                      p === pagination.page
                        ? "bg-accent text-white"
                        : "text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {p}
                  </button>
                </span>
              ))}
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-neutral-800"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
