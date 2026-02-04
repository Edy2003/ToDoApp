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
      <div className="flex items-center justify-center py-16" role="status" aria-busy="true" aria-label="Loading tasks...">
        <div className="h-10 w-10 rounded-full bg-neu-bg shadow-neu animate-pulse" />
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
    <div className="space-y-3 pb-24">
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
          <p className="px-4 text-xs font-medium uppercase tracking-wide text-text-muted">
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
