"use client";

import { useState } from "react";
import { db } from "@/lib/clientDb";

export type AuthStep = "email" | "code";

export function useAuth() {
  const { isLoading, user, error } = db.useAuth();
  const [authStep, setAuthStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const sendMagicCode = async (emailInput: string) => {
    try {
      setAuthError(null);
      setIsSending(true);
      await db.auth.sendMagicCode({ email: emailInput });
      setEmail(emailInput);
      setAuthStep("code");
    } catch {
      setAuthError("Failed to send code. Please check your email address.");
    } finally {
      setIsSending(false);
    }
  };

  const verifyCode = async (code: string) => {
    try {
      setAuthError(null);
      setIsVerifying(true);
      await db.auth.signInWithMagicCode({ email, code });
    } catch {
      setAuthError("Invalid code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const signOut = () => {
    db.auth.signOut();
    setAuthStep("email");
    setEmail("");
    setAuthError(null);
  };

  const resetAuth = () => {
    setAuthStep("email");
    setAuthError(null);
  };

  return {
    user,
    isLoading,
    error: error?.message || authError,
    authStep,
    email,
    isSending,
    isVerifying,
    sendMagicCode,
    verifyCode,
    signOut,
    resetAuth,
  };
}
