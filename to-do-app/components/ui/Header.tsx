"use client";

import { SignOutButton } from "@/components/auth/SignOutButton";

interface HeaderProps {
  userEmail?: string;
  onSignOut: () => void;
}

export function Header({ userEmail, onSignOut }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-zinc-200 px-4 py-4 dark:border-zinc-800 sm:px-6">
      <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        Tasks
      </h1>
      {userEmail && <SignOutButton email={userEmail} onSignOut={onSignOut} />}
    </header>
  );
}
