"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search by name, email, phone, or transaction ID...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-10 text-sm outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:focus:border-accent"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-neutral-400 hover:text-foreground"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
