export type { Todo, TodoWithOwner, CreateTodoInput, UpdateTodoInput } from "@/lib/db/types";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  message: string;
  action?: ToastAction;
  duration?: number;
}

export interface Toast extends ToastOptions {
  id: string;
}
