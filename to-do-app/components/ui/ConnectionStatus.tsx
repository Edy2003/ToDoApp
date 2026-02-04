"use client";

import { db } from "@/lib/clientDb";

export function ConnectionStatus() {
  const status = db.useConnectionStatus();

  // Hide when authenticated (fully connected)
  if (status === "authenticated" || status === "opened") return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-40 rounded-[12px] bg-neu-bg px-3 py-2 text-sm text-warning-text shadow-neu"
      role="status"
      aria-live="polite"
    >
      {status === "closed" || status === "errored" ? (
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-warning" aria-hidden="true" />
          Offline - changes saved locally
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-warning" aria-hidden="true" />
          Connecting...
        </span>
      )}
    </div>
  );
}
