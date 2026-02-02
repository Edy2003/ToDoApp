"use client";

import { useState, FormEvent } from "react";
import type { AuthStep } from "@/hooks/useAuth";

interface LoginFormProps {
  authStep: AuthStep;
  email: string;
  error: string | null;
  isSending: boolean;
  isVerifying: boolean;
  onSendCode: (email: string) => void;
  onVerifyCode: (code: string) => void;
  onBack: () => void;
}

export function LoginForm({
  authStep,
  email,
  error,
  isSending,
  isVerifying,
  onSendCode,
  onVerifyCode,
  onBack,
}: LoginFormProps) {
  const [emailInput, setEmailInput] = useState("");
  const [codeInput, setCodeInput] = useState("");

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      onSendCode(emailInput.trim());
    }
  };

  const handleCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (codeInput.trim()) {
      onVerifyCode(codeInput.trim());
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Welcome
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {authStep === "email"
              ? "Sign in to manage your tasks"
              : `Enter the code sent to ${email}`}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {authStep === "email" ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              />
            </div>
            <button
              type="submit"
              disabled={isSending || !emailInput.trim()}
              className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {isSending ? "Sending..." : "Continue with Email"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                autoFocus
                maxLength={6}
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-center text-lg tracking-widest text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
              />
            </div>
            <button
              type="submit"
              disabled={isVerifying || !codeInput.trim()}
              className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-lg px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
