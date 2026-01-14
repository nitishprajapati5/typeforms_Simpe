'use client';

import { useState } from 'react';
import { Menu, ChevronDown, FormInput, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavigationBarProps = {
  onMenuClick: () => void;
};

export default function NavigationBar({ onMenuClick }: NavigationBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-14 w-full border-b bg-background flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-muted cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <FormInput className="animate-spin-slow" />
        <span className="font-semibold text-lg">Forms Build Easy</span>
      </div>

      {/* Right - Profile Dropdown */}
      <div className="relative flex">
        <Button className="hidden lg:inline-flex">View Plans</Button>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted"
        >
          <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
            N
          </div>
          <span className="text-sm truncate hidden sm:block">
            nitishprajapati180@gmail.com
          </span>
          <ChevronDown size={16} />
        </button>

        {open && (
          <div className="absolute right-0 mt-8 w-48 rounded-md border bg-background shadow-md z-50 animate-in transition-all">
            <X
              size={16}
              className=" cursor-pointer absolute top-2 right-2"
              onClick={() => setOpen(false)}
            />
            <MenuItem label="Profile" />
            <MenuItem label="Billing" />
            <MenuItem label="Team" />
            <MenuItem label="Logout" danger />
          </div>
        )}
      </div>
    </nav>
  );
}

function MenuItem({ label, danger }: { label: string; danger?: boolean }) {
  return (
    <button
      className={`w-full text-left px-4 py-2 text-sm hover:bg-muted ${
        danger ? 'text-red-600' : ''
      }`}
    >
      {label}
    </button>
  );
}
