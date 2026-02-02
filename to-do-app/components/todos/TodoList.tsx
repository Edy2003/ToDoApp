"use client";

import { TodoItem } from "./TodoItem";
import { EmptyState } from "./EmptyState";
import type { Todo } from "@/types";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (todoId: string, completed: boolean) => void;
  onUpdate: (todoId: string, title: string) => void;
  onDelete: (todoId: string, title: string) => void;
}

export function TodoList({
  todos,
  isLoading,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100" />
      </div>
    );
  }

  if (todos.length === 0) {
    return <EmptyState />;
  }

  // Group todos by completion status for visual separation
  const incompleteTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="space-y-1 pb-24">
      {incompleteTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id, todo.completed)}
          onUpdate={(title) => onUpdate(todo.id, title)}
          onDelete={() => onDelete(todo.id, todo.title)}
        />
      ))}

      {completedTodos.length > 0 && incompleteTodos.length > 0 && (
        <div className="py-4">
          <p className="px-4 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            Completed ({completedTodos.length})
          </p>
        </div>
      )}

      {completedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id, todo.completed)}
          onUpdate={(title) => onUpdate(todo.id, title)}
          onDelete={() => onDelete(todo.id, todo.title)}
        />
      ))}
    </div>
  );
}
