"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import { db } from "@/lib/clientDb";
import { queries, mutations } from "@/lib/db";
import { useToast } from "./useToast";
import type { Todo } from "@/types";

export function useTodos(userId: string | undefined) {
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const deleteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Query todos
  const { data, isLoading, error } = db.useQuery(
    userId ? queries.todos() : null
  );

  const todos: Todo[] = data?.todos ?? [];

  // Sort: incomplete first, then completed (by order within each group)
  const sortedTodos = useMemo(() => {
    const visibleTodos = todos.filter((t) => t.id !== pendingDelete);
    const incomplete = visibleTodos.filter((t) => !t.completed);
    const completed = visibleTodos.filter((t) => t.completed);
    return [...incomplete, ...completed];
  }, [todos, pendingDelete]);

  // Get max order for new todos
  const getNextOrder = useCallback(() => {
    return todos.reduce((max, t) => Math.max(max, t.order ?? 0), 0) + 1;
  }, [todos]);

  // CRUD operations
  const createTodo = useCallback(
    (title: string) => {
      if (!userId || !title.trim()) return;
      mutations.createTodo(userId, title.trim(), getNextOrder());
    },
    [userId, getNextOrder]
  );

  const updateTodo = useCallback((todoId: string, title: string) => {
    if (!title.trim()) return;
    mutations.updateTodo(todoId, { title: title.trim().slice(0, 100) });
  }, []);

  const toggleComplete = useCallback((todoId: string, currentValue: boolean) => {
    mutations.toggleComplete(todoId, currentValue);
  }, []);

  const deleteTodo = useCallback(
    (todoId: string, todoTitle: string) => {
      // Clear any existing delete timeout
      if (deleteTimeoutRef.current) {
        clearTimeout(deleteTimeoutRef.current);
      }

      // Optimistically hide
      setPendingDelete(todoId);

      // Schedule actual deletion
      deleteTimeoutRef.current = setTimeout(() => {
        mutations.deleteTodo(todoId);
        setPendingDelete(null);
      }, 5000);

      // Show toast with undo
      showToast({
        message: `"${todoTitle.slice(0, 30)}${todoTitle.length > 30 ? "..." : ""}" deleted`,
        action: {
          label: "Undo",
          onClick: () => {
            if (deleteTimeoutRef.current) {
              clearTimeout(deleteTimeoutRef.current);
            }
            setPendingDelete(null);
          },
        },
        duration: 5000,
      });
    },
    [showToast]
  );

  return {
    todos: sortedTodos,
    isLoading,
    error: error?.message,
    createTodo,
    updateTodo,
    toggleComplete,
    deleteTodo,
  };
}
