"use client";

import type { Toast } from "@/types";

interface ToastComponentProps {
  toast: Toast;
  onDismiss: () => void;
}

export function ToastComponent({ toast, onDismiss }: ToastComponentProps) {
  return (
    <div className="animate-slide-up flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 text-sm text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
      <span>{toast.message}</span>
      {toast.action && (
        <button
          onClick={() => {
            toast.action?.onClick();
            onDismiss();
          }}
          className="font-medium text-blue-400 hover:text-blue-300 dark:text-blue-600 dark:hover:text-blue-700"
        >
          {toast.action.label}
        </button>
      )}
    </div>
  );
}
