"use client";

import { SignOutButton } from "@/components/auth/SignOutButton";

interface HeaderProps {
  userEmail?: string;
  onSignOut: () => void;
}

export function Header({ userEmail, onSignOut }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-neu-bg px-4 py-4 shadow-neu-sm sm:px-6">
      <h1 className="text-xl font-semibold tracking-tight text-primary">
        Tasks
      </h1>
      {userEmail && <SignOutButton email={userEmail} onSignOut={onSignOut} />}
    </header>
  );
}
