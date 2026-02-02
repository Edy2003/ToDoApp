import type { InstaQLEntity } from "@instantdb/react";
import type { AppSchema } from "@/instant.schema";

// Entity types
export type Todo = InstaQLEntity<AppSchema, "todos">;
export type TodoWithOwner = InstaQLEntity<AppSchema, "todos", { owner: {} }>;

// Input types for mutations
export interface CreateTodoInput {
  title: string;
}

export interface UpdateTodoInput {
  title?: string;
  completed?: boolean;
  order?: number;
}
