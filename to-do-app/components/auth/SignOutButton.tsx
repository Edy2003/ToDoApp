"use client";

import { useState, useRef, useEffect } from "react";

interface SignOutButtonProps {
  email: string;
  onSignOut: () => void;
}

export function SignOutButton({ email, onSignOut }: SignOutButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-neu-bg text-sm font-medium text-primary shadow-neu-sm transition-all duration-200 hover:shadow-neu active:shadow-neu-pressed"
        title={email}
        aria-label={`Account menu for ${email}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {email.charAt(0).toUpperCase()}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-48 rounded-[16px] bg-neu-bg py-1 shadow-neu z-30"
          role="menu"
        >
          <div className="border-b border-neu-dark/20 px-4 py-2">
            <p className="truncate text-sm text-secondary">
              {email}
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              onSignOut();
            }}
            className="w-full px-4 py-2 text-left text-sm text-primary transition-colors hover:bg-neu-dark/10"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
