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
    <div className="flex min-h-screen items-center justify-center px-4 bg-neu-bg">
      <div className="w-full max-w-sm">
        <div className="rounded-[24px] bg-neu-bg p-8 shadow-neu">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-primary">
              Welcome
            </h1>
            <p className="mt-2 text-sm text-secondary">
              {authStep === "email"
                ? "Sign in to manage your tasks"
                : `Enter the code sent to ${email}`}
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-[12px] bg-neu-bg px-4 py-3 text-sm text-danger-text shadow-neu-inset ring-1 ring-danger/30">
              {error}
            </div>
          )}

          {authStep === "email" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
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
                  className="mt-2 block w-full rounded-[16px] bg-neu-bg px-4 py-3 text-primary shadow-neu-inset placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <button
                type="submit"
                disabled={isSending || !emailInput.trim()}
                className="w-full rounded-[16px] bg-accent px-4 py-3 text-sm font-medium text-white shadow-neu-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-neu active:shadow-neu-pressed disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-neu-inset"
              >
                {isSending ? "Sending..." : "Continue with Email"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-primary"
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
                  className="mt-2 block w-full rounded-[16px] bg-neu-bg px-4 py-3 text-center text-lg tracking-widest text-primary shadow-neu-inset placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <button
                type="submit"
                disabled={isVerifying || !codeInput.trim()}
                className="w-full rounded-[16px] bg-accent px-4 py-3 text-sm font-medium text-white shadow-neu-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-neu active:shadow-neu-pressed disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-neu-inset"
              >
                {isVerifying ? "Verifying..." : "Verify Code"}
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full rounded-[16px] bg-neu-bg px-4 py-3 text-sm font-medium text-secondary shadow-neu-sm transition-all duration-200 hover:shadow-neu hover:text-primary active:shadow-neu-pressed"
              >
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
