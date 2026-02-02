"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useLongPress } from "@/hooks/useLongPress";
import type { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onUpdate: (title: string) => void;
  onDelete: () => void;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue.trim() && editValue.trim() !== todo.title) {
      onUpdate(editValue.trim());
    } else {
      setEditValue(todo.title);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const longPressProps = useLongPress({
    onLongPress: () => setShowDeleteConfirm(true),
  });

  return (
    <div
      className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
        todo.completed
          ? "bg-zinc-50 dark:bg-zinc-900/50"
          : "bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/50"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
          todo.completed
            ? "border-emerald-500 bg-emerald-500"
            : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-600 dark:hover:border-zinc-500"
        }`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && (
          <svg
            className="h-3.5 w-3.5 animate-checkbox-fill text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Title / Edit Input */}
      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            maxLength={100}
            className="flex-1 rounded border border-zinc-300 bg-white px-2 py-1 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
      ) : (
        <span
          onClick={() => !todo.completed && setIsEditing(true)}
          {...longPressProps}
          className={`flex-1 cursor-pointer select-none transition-all duration-300 ${
            todo.completed
              ? "text-zinc-400 line-through dark:text-zinc-500"
              : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {todo.title}
        </span>
      )}

      {/* Delete button (visible on hover for desktop) */}
      {!isEditing && !showDeleteConfirm && (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 opacity-0 transition-opacity hover:bg-zinc-100 hover:text-zinc-600 group-hover:opacity-100 dark:hover:bg-zinc-700 dark:hover:text-zinc-300 sm:opacity-100 sm:group-hover:opacity-100"
          aria-label="Delete task"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onDelete();
              setShowDeleteConfirm(false);
            }}
            className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
