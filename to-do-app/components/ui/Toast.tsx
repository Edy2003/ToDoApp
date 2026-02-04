"use client";

import type { Toast } from "@/types";

interface ToastComponentProps {
  toast: Toast;
  onDismiss: () => void;
}

export function ToastComponent({ toast, onDismiss }: ToastComponentProps) {
  return (
    <div
      className="animate-slide-up flex items-center gap-3 rounded-[16px] bg-neu-bg px-4 py-3 text-sm text-text-primary shadow-neu"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span>{toast.message}</span>
      {toast.action && (
        <button
          onClick={() => {
            toast.action?.onClick();
            onDismiss();
          }}
          className="font-medium text-accent-text hover:text-accent-hover transition-colors duration-200"
        >
          {toast.action.label}
        </button>
      )}
    </div>
  );
}
