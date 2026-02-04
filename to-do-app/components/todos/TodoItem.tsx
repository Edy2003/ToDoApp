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
      className={`group relative flex items-center gap-4 rounded-[16px] p-4 transition-all duration-200 bg-neu-bg ${
        todo.completed
          ? "shadow-neu-inset"
          : "shadow-neu hover:shadow-neu-sm"
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={`relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          todo.completed
            ? "shadow-neu-pressed bg-success"
            : "shadow-neu-sm bg-neu-bg hover:shadow-neu"
        }`}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        role="checkbox"
        aria-checked={todo.completed}
      >
        {todo.completed && (
          <svg
            className="h-3.5 w-3.5 animate-checkbox-fill text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            aria-hidden="true"
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
            className="flex-1 rounded-[16px] bg-neu-bg px-4 py-2 text-text-primary shadow-neu-inset placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>
      ) : (
        <span
          onClick={() => !todo.completed && setIsEditing(true)}
          {...longPressProps}
          className={`flex-1 cursor-pointer select-none transition-all duration-300 ${
            todo.completed
              ? "text-text-muted line-through"
              : "text-text-primary"
          }`}
        >
          {todo.title}
        </span>
      )}

      {/* Delete button (visible on hover for desktop) */}
      {!isEditing && !showDeleteConfirm && (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary opacity-0 transition-all duration-200 shadow-neu-sm hover:shadow-neu hover:text-danger-text group-hover:opacity-100 sm:opacity-100 sm:group-hover:opacity-100 active:shadow-neu-pressed"
          aria-label={`Delete task: ${todo.title}`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
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
            className="rounded-[12px] bg-danger px-3 py-1.5 text-xs font-medium text-white shadow-neu-sm hover:shadow-neu active:shadow-neu-pressed transition-all duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="rounded-[12px] bg-neu-bg px-3 py-1.5 text-xs font-medium text-text-secondary shadow-neu-sm hover:shadow-neu active:shadow-neu-pressed transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
