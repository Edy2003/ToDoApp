"use client";

import { db } from "@/lib/clientDb";

export function ConnectionStatus() {
  const status = db.useConnectionStatus();

  // Hide when authenticated (fully connected)
  if (status === "authenticated" || status === "opened") return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-800 shadow-md dark:bg-amber-900 dark:text-amber-100">
      {status === "closed" || status === "errored" ? (
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          Offline - changes saved locally
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
          Connecting...
        </span>
      )}
    </div>
  );
}
